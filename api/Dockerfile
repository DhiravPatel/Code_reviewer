FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN bun install --production

COPY . .

RUN bunx prisma generate

EXPOSE 8000

CMD ["bun", "run", "src/server.ts"]
