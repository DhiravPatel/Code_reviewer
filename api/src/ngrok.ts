/**
 * Starts ngrok tunnel and updates API_BASE_URL before booting the server.
 * Usage: bun run src/ngrok.ts
 */
import { buildApp } from './app';
import { env } from './config/env';

async function startNgrokTunnel(port: number): Promise<string> {
  console.log(`Starting ngrok tunnel on port ${port}...`);

  // Start ngrok in background
  const proc = Bun.spawn(['ngrok', 'http', String(port), '--log', 'stdout', '--log-format', 'json'], {
    stdout: 'pipe',
    stderr: 'pipe',
  });

  // Wait for the tunnel URL from ngrok's local API (it takes a moment to start)
  let tunnelUrl = '';
  const maxRetries = 30;

  for (let i = 0; i < maxRetries; i++) {
    await new Promise((r) => setTimeout(r, 1000));

    try {
      const res = await fetch('http://127.0.0.1:4040/api/tunnels');
      if (res.ok) {
        const data = (await res.json()) as any;
        const tunnel = data.tunnels?.find((t: any) => t.proto === 'https');
        if (tunnel) {
          tunnelUrl = tunnel.public_url;
          break;
        }
      }
    } catch {
      // ngrok not ready yet
    }
  }

  if (!tunnelUrl) {
    proc.kill();
    throw new Error('Failed to get ngrok tunnel URL after 30 seconds');
  }

  return tunnelUrl;
}

async function start() {
  try {
    const tunnelUrl = await startNgrokTunnel(env.PORT);

    console.log('');
    console.log('='.repeat(60));
    console.log(`  ngrok tunnel: ${tunnelUrl}`);
    console.log(`  Webhook URL:  ${tunnelUrl}/api/v1/webhooks/github`);
    console.log('='.repeat(60));
    console.log('');

    // Override API_BASE_URL at runtime with the ngrok URL
    (env as any).API_BASE_URL = tunnelUrl;
    process.env.API_BASE_URL = tunnelUrl;

    const app = await buildApp();

    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    app.log.info(`Server ready at http://localhost:${env.PORT}`);
    app.log.info(`ngrok tunnel at ${tunnelUrl}`);
  } catch (err) {
    console.error('Failed to start:', err);
    process.exit(1);
  }
}

start();
