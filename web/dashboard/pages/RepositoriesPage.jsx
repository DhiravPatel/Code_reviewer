import { useState, useEffect } from 'react'
import { RefreshCw, Star, GitBranch, ExternalLink, Lock, Globe, CheckCircle, Search, Loader2, AlertCircle } from 'lucide-react'
import { api } from '../../shared/api/axios'
import { useAuth } from '../../shared/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Vue: '#41b883',
}

export default function RepositoriesPage() {
  const { githubConnected } = useAuth()
  const navigate = useNavigate()
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [enabledCount, setEnabledCount] = useState(0)
  const [togglingId, setTogglingId] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchRepos = async () => {
    try {
      setError(null)
      const response = await api.get('/repos')
      const data = response.data?.data
      setRepos(data.repos || [])
      setEnabledCount(data.enabledCount || 0)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch repositories')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (githubConnected) {
      fetchRepos()
    } else {
      setLoading(false)
    }
  }, [githubConnected])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchRepos()
  }

  const handleToggle = async (repo) => {
    setTogglingId(repo.githubRepoId)
    try {
      if (repo.enabled) {
        await api.post('/repos/disable', { githubRepoId: repo.githubRepoId })
        setRepos((prev) =>
          prev.map((r) => r.githubRepoId === repo.githubRepoId ? { ...r, enabled: false } : r)
        )
        setEnabledCount((c) => c - 1)
      } else {
        await api.post('/repos/enable', {
          githubRepoId: repo.githubRepoId,
          fullName: repo.fullName,
          name: repo.name,
          owner: repo.owner,
          language: repo.language,
          description: repo.description,
          isPrivate: repo.isPrivate,
          defaultBranch: repo.defaultBranch,
        })
        setRepos((prev) =>
          prev.map((r) => r.githubRepoId === repo.githubRepoId ? { ...r, enabled: true } : r)
        )
        setEnabledCount((c) => c + 1)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update repository')
      setTimeout(() => setError(null), 4000)
    } finally {
      setTogglingId(null)
    }
  }

  const filteredRepos = repos.filter((r) =>
    r.fullName.toLowerCase().includes(search.toLowerCase()) ||
    (r.description || '').toLowerCase().includes(search.toLowerCase())
  )

  // Not connected state
  if (!githubConnected) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl animate-fade-in">
        <div className="t-card p-12 text-center">
          <GitBranch size={48} className="t-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold t-text mb-2">GitHub Not Connected</h3>
          <p className="t-text-muted text-sm mb-6">Connect your GitHub account to see your repositories.</p>
          <button
            onClick={() => navigate('/dashboard/integrations')}
            className="btn-primary text-sm px-6"
          >
            Connect GitHub
          </button>
        </div>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl animate-fade-in">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-brand-400" />
          <span className="ml-3 t-text-muted">Fetching repositories from GitHub...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl animate-fade-in">
      {/* Error toast */}
      {error && (
        <div className="mb-6 p-4 rounded-xl border bg-red-500/10 border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2 animate-fade-in">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold t-text tracking-tight mb-1">Repositories</h1>
          <p className="t-text-muted">
            {repos.length} repositories found &middot;{' '}
            <span className="text-brand-400 font-medium">{enabledCount}/5 enabled</span> for AI review
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="btn-primary text-sm"
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 t-text-muted" />
        <input
          type="text"
          placeholder="Search repositories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl t-bg-input border t-border-subtle t-text placeholder:t-text-muted focus:outline-none focus:border-brand-500/50 text-sm transition-colors"
        />
      </div>

      {/* Enabled repos limit indicator */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs t-text-muted font-medium">AI Review Slots</span>
          <span className="text-xs text-brand-400 font-semibold">{enabledCount}/5</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-surface-200 dark:bg-surface-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              enabledCount >= 5 ? 'bg-red-500' : 'bg-gradient-to-r from-brand-500 to-cyan-500'
            }`}
            style={{ width: `${(enabledCount / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Repos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredRepos.map((repo, idx) => {
          const isToggling = togglingId === repo.githubRepoId
          const canEnable = enabledCount < 5 || repo.enabled

          return (
            <div
              key={repo.githubRepoId}
              className={`t-bg-card border p-5 lg:p-6 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md ${
                repo.enabled ? 'border-brand-500/30 bg-brand-500/[0.02]' : 't-border-subtle'
              }`}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {repo.isPrivate ? (
                      <Lock size={13} className="t-text-muted flex-shrink-0" />
                    ) : (
                      <Globe size={13} className="t-text-muted flex-shrink-0" />
                    )}
                    <h3 className="text-base font-semibold t-text truncate">{repo.name}</h3>
                  </div>
                  <p className="t-text-faint text-xs font-mono truncate">{repo.fullName}</p>
                </div>
                {repo.enabled && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-brand-500/15 text-brand-400 border border-brand-500/20 flex items-center gap-1 flex-shrink-0 ml-2">
                    <CheckCircle size={10} />
                    Active
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="t-text-muted text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
                {repo.description || 'No description'}
              </p>

              {/* Stats row */}
              <div className="flex gap-4 mb-4">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#8b8b8b' }}
                    />
                    <span className="t-text-secondary text-xs font-medium">{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 t-text-muted">
                  <Star size={13} />
                  <span className="text-xs font-medium t-text-secondary">{repo.stars?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center gap-1 t-text-muted">
                  <GitBranch size={13} />
                  <span className="text-xs font-medium t-text-secondary">{repo.forks || 0}</span>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-2 pt-4 border-t t-border-subtle">
                <button
                  onClick={() => handleToggle(repo)}
                  disabled={isToggling || (!canEnable && !repo.enabled)}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    repo.enabled
                      ? 'border border-red-500/30 text-red-400 hover:bg-red-500/10'
                      : 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                  }`}
                >
                  {isToggling ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : null}
                  {isToggling
                    ? repo.enabled ? 'Disabling...' : 'Enabling...'
                    : repo.enabled ? 'Disable Review' : enabledCount >= 5 ? 'Limit Reached (5/5)' : 'Enable AI Review'}
                </button>
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl t-bg-input border t-border-subtle flex items-center justify-center t-text-muted hover:t-text transition-colors flex-shrink-0"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty search */}
      {filteredRepos.length === 0 && repos.length > 0 && (
        <div className="t-card p-12 text-center">
          <Search size={48} className="t-text-secondary mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold t-text mb-2">No repositories match your search</h3>
          <p className="t-text-muted text-sm">Try a different search term.</p>
        </div>
      )}
    </div>
  )
}
