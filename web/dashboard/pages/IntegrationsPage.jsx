import { useState, useEffect } from 'react'
import { Check, Loader2, Plug, ArrowRight, X, AlertCircle, ExternalLink } from 'lucide-react'
import { useAuth } from '../../shared/context/AuthContext'
import { api } from '../../shared/api/axios'
import { useSearchParams } from 'react-router-dom'

// ─── Logos ───────────────────────────────────────────────────
function GithubLogo({ className = '' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    </svg>
  )
}

function GitlabLogo({ className = '' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 380 380" fill="currentColor" className={className}>
      <path d="M282.83,170.73,277.31,153.42,265.39,116.83a4.49,4.49,0,0,0-8.49,0L245,153.42H134.91l-12-36.59a4.49,4.49,0,0,0-8.49,0L102.61,153.42,97.09,170.73a9,9,0,0,0,3.27,10.06L190,246.94l89.65-66.15A9,9,0,0,0,282.83,170.73Z" />
    </svg>
  )
}

function BitbucketLogo({ className = '' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M.778 1.213a.768.768 0 0 0-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 0 0 .77-.646l3.27-20.03a.768.768 0 0 0-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z" />
    </svg>
  )
}

// ─── Toast ───────────────────────────────────────────────────
function Toast({ toast, onClose }) {
  const variant =
    toast.type === 'success'
      ? 'bg-brand-500/10 border-brand-500/20 text-brand-400'
      : toast.type === 'info'
      ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
      : 'bg-red-500/10 border-red-500/20 text-red-400'

  const Icon = toast.type === 'success' ? Check : toast.type === 'info' ? Plug : AlertCircle

  return (
    <div className={`mb-5 p-3.5 rounded-lg border ${variant} text-sm flex items-center gap-2 animate-fade-in`}>
      <Icon size={14} />
      <span className="flex-1">{toast.message}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  )
}

// ─── Integration Card ────────────────────────────────────────
function IntegrationCard({
  Logo,
  name,
  description,
  status,           // 'connected' | 'available' | 'soon'
  username = null,
  onConnect,
  onDisconnect,
  loading = false,
}) {
  const isConnected = status === 'connected'
  const isSoon = status === 'soon'

  return (
    <div className={`group relative t-bg-card border rounded-xl p-5 transition-all ${
      isConnected
        ? 'border-brand-500/25'
        : isSoon
        ? 't-border-subtle opacity-60'
        : 't-border-subtle hover:border-brand-500/20'
    }`}>
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-lg t-bg-input border t-border-subtle flex items-center justify-center">
          <Logo className="t-text" />
        </div>
        {isConnected ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-400">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
            Connected
          </span>
        ) : isSoon ? (
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface-700/40 t-text-muted">
            Soon
          </span>
        ) : null}
      </div>

      {/* Title + meta */}
      <h3 className="text-base font-semibold t-text mb-1">{name}</h3>
      {isConnected && username && (
        <p className="text-xs font-mono text-brand-400 mb-2">@{username}</p>
      )}
      <p className="t-text-muted text-sm leading-relaxed mb-5 min-h-[40px]">
        {description}
      </p>

      {/* Action */}
      {isSoon ? (
        <button disabled className="w-full h-9 rounded-md t-bg-input border t-border-subtle t-text-muted text-sm font-medium cursor-not-allowed">
          Coming soon
        </button>
      ) : isConnected ? (
        <button
          onClick={onDisconnect}
          disabled={loading}
          className="w-full h-9 rounded-md border t-border-subtle t-bg-input t-text-secondary hover:text-red-400 hover:border-red-500/30 text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : null}
          {loading ? 'Disconnecting…' : 'Disconnect'}
        </button>
      ) : (
        <button
          onClick={onConnect}
          className="w-full h-9 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <Plug size={13} />
          Connect
          <ArrowRight size={13} />
        </button>
      )}
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────
export default function IntegrationsPage() {
  const { githubConnected, githubUsername, refetchUser } = useAuth()
  const [disconnecting, setDisconnecting] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [toast, setToast] = useState(null)

  // Handle URL params from GitHub OAuth redirect
  useEffect(() => {
    const github = searchParams.get('github')
    const error = searchParams.get('error')

    if (github === 'connected') {
      setToast({ type: 'success', message: 'GitHub connected successfully.' })
      refetchUser()
      searchParams.delete('github')
      setSearchParams(searchParams, { replace: true })
    } else if (github === 'already_connected') {
      setToast({ type: 'info', message: 'GitHub is already connected.' })
      searchParams.delete('github')
      setSearchParams(searchParams, { replace: true })
    } else if (error) {
      const messages = {
        github_connect_failed: 'Failed to connect GitHub. Please try again.',
        github_missing_params: 'GitHub connection failed — missing parameters.',
        github_invalid_state: 'GitHub session expired. Please try again.',
        github_state_expired: 'GitHub connection timed out. Please try again.',
      }
      setToast({ type: 'error', message: messages[error] || 'An error occurred.' })
      searchParams.delete('error')
      setSearchParams(searchParams, { replace: true })
    }
  }, [searchParams])

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 5000)
      return () => clearTimeout(t)
    }
  }, [toast])

  const handleConnect = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/integrations/github/connect`
  }

  const handleDisconnect = async () => {
    setDisconnecting(true)
    try {
      await api.delete('/integrations/github/disconnect')
      refetchUser()
      setToast({ type: 'success', message: 'GitHub disconnected.' })
    } catch {
      setToast({ type: 'error', message: 'Failed to disconnect GitHub.' })
    } finally {
      setDisconnecting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8 animate-fade-in">
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold t-text mb-1">Integrations</h1>
        <p className="t-text-muted text-sm">
          Connect platforms to sync repositories and enable AI code reviews on every pull request.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <IntegrationCard
          Logo={GithubLogo}
          name="GitHub"
          description="Sync repositories and auto-review pull requests."
          status={githubConnected ? 'connected' : 'available'}
          username={githubUsername}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          loading={disconnecting}
        />

        <IntegrationCard
          Logo={GitlabLogo}
          name="GitLab"
          description="Support for merge requests on GitLab repositories."
          status="soon"
        />

        <IntegrationCard
          Logo={BitbucketLogo}
          name="Bitbucket"
          description="Support for Bitbucket pull request reviews."
          status="soon"
        />
      </div>

      {/* Help row */}
      <div className="mt-8 flex items-center justify-between p-4 rounded-lg t-bg-card border t-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center">
            <Plug size={14} className="text-brand-400" />
          </div>
          <div>
            <p className="t-text text-sm font-medium">Need a different integration?</p>
            <p className="t-text-muted text-xs">Let us know what you'd like us to support next.</p>
          </div>
        </div>
        <a
          href="mailto:hello@codereview.ai"
          className="inline-flex items-center gap-1.5 text-xs t-text-secondary hover:t-text font-medium transition-colors"
        >
          Contact us
          <ExternalLink size={11} />
        </a>
      </div>
    </div>
  )
}
