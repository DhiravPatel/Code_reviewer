import { useState, useEffect } from 'react'
import { Plus, Check, Loader2, Unplug } from 'lucide-react'
import { useAuth } from '../../shared/context/AuthContext'
import { api } from '../../shared/api/axios'
import { useSearchParams } from 'react-router-dom'

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
      setToast({ type: 'success', message: 'GitHub connected successfully!' })
      refetchUser()
      // Clean up URL
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
        github_invalid_state: 'GitHub connection failed — invalid or expired session. Please try again.',
        github_state_expired: 'GitHub connection timed out. Please try again.',
      }
      setToast({ type: 'error', message: messages[error] || 'An error occurred.' })
      searchParams.delete('error')
      setSearchParams(searchParams, { replace: true })
    }
  }, [searchParams])

  // Auto-dismiss toast after 5s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000)
      return () => clearTimeout(timer)
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
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to disconnect GitHub.' })
    } finally {
      setDisconnecting(false)
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl animate-fade-in">
      {/* Toast notification */}
      {toast && (
        <div className={`mb-6 p-4 rounded-xl border text-sm font-medium animate-fade-in ${
          toast.type === 'success'
            ? 'bg-green-500/10 border-green-500/20 text-green-400'
            : toast.type === 'info'
            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold t-text tracking-tight mb-2">Integrations</h1>
        <p className="t-text-muted">Connect your platforms to enable repository synchronization and automated code reviews.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* GitHub Integration Card */}
        <div className="t-bg-card border t-border-subtle p-6 rounded-2xl shadow-sm flex flex-col hover:border-brand-500/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-surface-100 dark:bg-surface-800 rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-surface-800 dark:text-surface-200">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
            </div>
            {githubConnected ? (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-green-500/15 text-green-400 border border-green-500/20 flex items-center gap-1">
                <Check size={10} />
                Connected
              </span>
            ) : (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-surface-200 text-surface-600 dark:bg-surface-800 dark:text-surface-400">
                Not Connected
              </span>
            )}
          </div>

          <h3 className="t-text text-lg font-bold mb-1">GitHub</h3>

          {githubConnected && githubUsername && (
            <p className="text-brand-400 text-sm font-medium mb-2">@{githubUsername}</p>
          )}

          <p className="t-text-secondary text-sm mb-6 flex-1">
            {githubConnected
              ? 'Your GitHub account is connected. Repositories and pull requests will be synced automatically.'
              : 'Connect your GitHub account to sync repositories and automatically analyze pull requests.'}
          </p>

          {githubConnected ? (
            <button
              onClick={handleDisconnect}
              disabled={disconnecting}
              className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 font-medium active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {disconnecting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Unplug size={16} />
              )}
              {disconnecting ? 'Disconnecting...' : 'Disconnect GitHub'}
            </button>
          ) : (
            <button
              onClick={handleConnect}
              className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-medium shadow-sm shadow-brand-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Connect GitHub
            </button>
          )}
        </div>

        {/* Coming soon GitLab */}
        <div className="t-bg-card border border-dashed t-border-subtle p-6 rounded-2xl shadow-sm flex flex-col opacity-60">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-surface-100 dark:bg-surface-800 rounded-xl flex items-center justify-center opacity-50 grayscale">
              <img src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png" className="w-6 h-6 object-contain" alt="GitLab" />
            </div>
          </div>
          <h3 className="t-text text-lg font-bold mb-2">GitLab</h3>
          <p className="t-text-secondary text-sm mb-6 flex-1">
            Support for GitLab repositories and merge requests is currently in development.
          </p>
          <button disabled className="w-full py-2.5 rounded-xl t-bg-input t-text-muted font-medium cursor-not-allowed">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  )
}
