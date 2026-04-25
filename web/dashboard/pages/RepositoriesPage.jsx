import { useState, useEffect, useMemo } from 'react'
import {
  RefreshCw, Star, ExternalLink, Lock, Search, Loader2, AlertCircle,
  Code2, GitFork, Github, ArrowRight, X, Check
} from 'lucide-react'
import { api } from '../../shared/api/axios'
import { useAuth } from '../../shared/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Go: '#00ADD8', Rust: '#dea584', Java: '#b07219', Ruby: '#701516',
  PHP: '#4F5D95', 'C++': '#f34b7d', C: '#555555', 'C#': '#178600',
  Swift: '#F05138', Kotlin: '#A97BFF', HTML: '#e34c26', CSS: '#563d7c',
  Shell: '#89e051', Dart: '#00B4AB', Vue: '#41b883',
}

function timeAgoShort(dateStr) {
  if (!dateStr) return ''
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return 'now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  if (diff < 30 * 86400) return `${Math.floor(diff / 86400)}d`
  if (diff < 365 * 86400) return `${Math.floor(diff / (30 * 86400))}mo`
  return `${Math.floor(diff / (365 * 86400))}y`
}

// ─── Skeleton row ──────────────────────────────────────────────
function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 border-b t-border-subtle animate-pulse last:border-b-0">
      <div className="w-8 h-8 rounded-md bg-[var(--bg-input)] flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-3.5 w-2/5 bg-[var(--bg-input)] rounded" />
        <div className="h-3 w-3/5 bg-[var(--bg-input)] opacity-60 rounded" />
      </div>
      <div className="w-20 h-7 bg-[var(--bg-input)] rounded-md flex-shrink-0" />
    </div>
  )
}

// ─── Empty state ───────────────────────────────────────────────
function StateContainer({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-12 h-12 rounded-xl t-bg-input flex items-center justify-center mb-4">
        <Icon size={20} className="t-text-muted" />
      </div>
      <h3 className="text-base font-semibold t-text mb-1.5">{title}</h3>
      <p className="t-text-muted text-sm max-w-sm mb-5 leading-relaxed">{description}</p>
      {action}
    </div>
  )
}

// ─── Repo Row ──────────────────────────────────────────────────
function RepoRow({ repo, isToggling, canEnable, onToggle }) {
  const langColor = LANGUAGE_COLORS[repo.language] || '#94a3b8'

  return (
    <div className="group flex items-center gap-4 px-5 py-3.5 border-b t-border-subtle hover:bg-[var(--bg-surface-hover)] transition-colors duration-150 last:border-b-0">
      {/* Left: icon + name */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-md t-bg-input flex items-center justify-center flex-shrink-0">
          <Code2 size={14} className="t-text-muted" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[13.5px] font-semibold t-text hover:text-brand-400 transition-colors truncate"
            >
              {repo.name}
            </a>
            {repo.isPrivate && (
              <Lock size={11} className="t-text-muted flex-shrink-0" />
            )}
            {repo.enabled && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 flex-shrink-0">
                <span className="w-1 h-1 rounded-full bg-brand-400" />
                Active
              </span>
            )}
          </div>
          <p className="text-xs t-text-muted truncate mt-0.5">
            {repo.fullName}
            {repo.description && (
              <>
                <span className="opacity-60 mx-1.5">·</span>
                <span>{repo.description}</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Middle: stats (large screens) */}
      <div className="hidden md:flex items-center gap-5 text-xs t-text-muted flex-shrink-0 w-[280px] justify-end">
        {repo.language && (
          <div className="flex items-center gap-1.5 min-w-[80px]">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: langColor }} />
            <span className="t-text-secondary truncate">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1 min-w-[44px] justify-end">
          <Star size={11} />
          <span className="tabular-nums t-text-secondary">{(repo.stars || 0).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1 min-w-[40px] justify-end">
          <GitFork size={11} />
          <span className="tabular-nums t-text-secondary">{repo.forks || 0}</span>
        </div>
        {repo.updatedAt && (
          <div className="text-[11px] t-text-faint min-w-[28px] text-right">
            {timeAgoShort(repo.updatedAt)}
          </div>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-md flex items-center justify-center t-text-muted hover:t-text hover:t-bg-input transition-all"
          title="Open on GitHub"
        >
          <ExternalLink size={12} />
        </a>
        <button
          onClick={() => onToggle(repo)}
          disabled={isToggling || (!canEnable && !repo.enabled)}
          className={`inline-flex items-center justify-center gap-1.5 h-7 px-3 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[78px] border ${
            repo.enabled
              ? 't-bg-input t-border-subtle t-text-secondary hover:text-red-400 hover:border-red-500/30'
              : 'border-transparent bg-brand-500 hover:bg-brand-600 text-white'
          }`}
        >
          {isToggling ? (
            <Loader2 size={11} className="animate-spin" />
          ) : repo.enabled ? (
            <Check size={11} />
          ) : null}
          {isToggling ? '' : repo.enabled ? 'Enabled' : !canEnable ? 'Limit' : 'Enable'}
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────
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
  const [filter, setFilter] = useState('all')

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
        setRepos((p) => p.map((r) => (r.githubRepoId === repo.githubRepoId ? { ...r, enabled: false } : r)))
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
        setRepos((p) => p.map((r) => (r.githubRepoId === repo.githubRepoId ? { ...r, enabled: true } : r)))
        setEnabledCount((c) => c + 1)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update repository')
      setTimeout(() => setError(null), 4000)
    } finally {
      setTogglingId(null)
    }
  }

  const filteredRepos = useMemo(() => {
    return repos.filter((r) => {
      if (filter === 'enabled' && !r.enabled) return false
      if (filter === 'disabled' && r.enabled) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          r.fullName.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          (r.description || '').toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [repos, filter, search])

  // ─── Not connected ──────────────────────────────────────────
  if (!githubConnected && !loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold t-text mb-1 tracking-tight">Repositories</h1>
          <p className="t-text-muted text-sm">Enable AI code review on up to 5 repositories.</p>
        </div>
        <StateContainer
          icon={Github}
          title="Connect GitHub"
          description="Link your GitHub account to view your repositories and enable AI reviews."
          action={
            <button
              onClick={() => navigate('/dashboard/integrations')}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-all"
            >
              <Github size={14} />
              Connect GitHub
              <ArrowRight size={13} />
            </button>
          }
        />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10 animate-fade-in">
      {/* Error banner */}
      {error && (
        <div className="mb-5 p-3.5 rounded-lg border bg-red-500/10 border-red-500/20 text-red-400 text-sm flex items-center gap-2">
          <AlertCircle size={14} />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="hover:text-red-300">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold t-text mb-1 tracking-tight">Repositories</h1>
          <p className="t-text-muted text-sm">
            {loading ? (
              <span>Loading…</span>
            ) : (
              <>
                <span className="t-text-secondary">{repos.length}</span> repositories
                <span className="opacity-50 mx-1.5">·</span>
                <span className="text-brand-400 font-medium">{enabledCount} of 5</span> enabled for AI review
              </>
            )}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing || loading}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md t-bg-input border t-border-subtle t-text-secondary hover:t-text text-xs font-medium transition-all disabled:opacity-50 self-start"
        >
          <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing' : 'Refresh'}
        </button>
      </header>

      {/* Slot meter card */}
      <div className="mb-5 t-bg-card border t-border-subtle rounded-lg px-4 py-3 flex items-center gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-semibold t-text-muted">AI Review Slots</span>
            <span className={`text-xs font-bold tabular-nums ${enabledCount >= 5 ? 'text-amber-400' : 'text-brand-400'}`}>
              {enabledCount}<span className="t-text-muted font-medium"> / 5</span>
            </span>
          </div>
          <div className="h-1 rounded-full t-bg-input overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                enabledCount >= 5 ? 'bg-amber-500' : 'bg-gradient-to-r from-brand-500 to-cyan-500'
              }`}
              style={{ width: `${(enabledCount / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Search + Filter row */}
      <div className="mb-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 t-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 h-9 rounded-md t-bg-input border t-border-subtle t-text placeholder:t-text-muted focus:outline-none focus:border-brand-500/50 text-sm transition-colors"
          />
        </div>
        <div className="flex items-center gap-0.5 t-bg-input border t-border-subtle rounded-md p-0.5">
          {[
            { key: 'all', label: 'All' },
            { key: 'enabled', label: 'Enabled' },
            { key: 'disabled', label: 'Available' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 h-7 rounded text-xs font-medium transition-all whitespace-nowrap ${
                filter === f.key ? 't-bg-surface t-text shadow-sm' : 't-text-muted hover:t-text'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="t-bg-card border t-border-subtle rounded-lg overflow-hidden">
        {loading ? (
          <div>
            {Array.from({ length: 7 }).map((_, i) => <RowSkeleton key={i} />)}
          </div>
        ) : filteredRepos.length === 0 ? (
          repos.length === 0 ? (
            <StateContainer
              icon={Code2}
              title="No repositories found"
              description="We couldn't find any repositories on your GitHub account."
            />
          ) : (
            <StateContainer
              icon={Search}
              title="No matches"
              description="Try adjusting your search or filter."
              action={
                <button
                  onClick={() => { setSearch(''); setFilter('all') }}
                  className="text-brand-400 hover:text-brand-300 text-sm font-medium"
                >
                  Clear filters
                </button>
              }
            />
          )
        ) : (
          <div>
            {filteredRepos.map((repo) => (
              <RepoRow
                key={repo.githubRepoId}
                repo={repo}
                isToggling={togglingId === repo.githubRepoId}
                canEnable={enabledCount < 5 || repo.enabled}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer count */}
      {!loading && filteredRepos.length > 0 && (
        <p className="text-center text-xs t-text-muted mt-4">
          Showing {filteredRepos.length} of {repos.length}
        </p>
      )}
    </div>
  )
}
