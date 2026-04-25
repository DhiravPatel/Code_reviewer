import { useNavigate } from 'react-router-dom'
import {
  Eye, Check, Clock, AlertCircle, GitBranch, Loader2, Sparkles, RefreshCw,
  Github, Code2, GitPullRequest, ArrowRight, X
} from 'lucide-react'
import { useState, useEffect, useRef, useMemo } from 'react'
import { api } from '../../shared/api/axios'
import { useAuth } from '../../shared/context/AuthContext'

// ─── Skeleton ────────────────────────────────────────────────
function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b t-border-subtle animate-pulse">
      <div className="w-9 h-9 rounded-full bg-surface-700/40 flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-3.5 w-1/2 bg-surface-700/40 rounded" />
        <div className="h-3 w-3/4 bg-surface-700/25 rounded" />
      </div>
      <div className="w-20 h-5 bg-surface-700/40 rounded-full flex-shrink-0" />
      <div className="w-20 h-8 bg-surface-700/40 rounded-md flex-shrink-0" />
    </div>
  )
}

// ─── State container ─────────────────────────────────────────
function StateContainer({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-12 h-12 rounded-xl t-bg-input border t-border-subtle flex items-center justify-center mb-4">
        <Icon size={20} className="t-text-muted" />
      </div>
      <h3 className="text-base font-semibold t-text mb-1.5">{title}</h3>
      <p className="t-text-muted text-sm max-w-sm mb-5 leading-relaxed">{description}</p>
      {action}
    </div>
  )
}

// ─── PR Row ──────────────────────────────────────────────────
function PRRow({ pr, onClick, onTriggerReview, reviewingId, timeAgo }) {
  const isReviewingNow = reviewingId === `${pr.repoId}:${pr.number}` || pr.reviewStatus === 'reviewing'

  const StatusBadge = () => {
    if (pr.reviewStatus === 'completed') {
      if (pr.reviewVerdict === 'approved') {
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-brand-500/10 text-brand-400">
            <Check size={10} />
            Approved
          </span>
        )
      }
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-red-500/10 text-red-400">
          <AlertCircle size={10} />
          Changes
        </span>
      )
    }
    if (pr.reviewStatus === 'reviewing') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-amber-500/10 text-amber-400">
          <Loader2 size={10} className="animate-spin" />
          Reviewing
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-surface-700/40 t-text-muted">
        <Clock size={10} />
        Pending
      </span>
    )
  }

  return (
    <div
      onClick={() => pr.reviewId && onClick(pr.reviewId)}
      className={`group flex items-center gap-4 px-5 py-3.5 border-b t-border-subtle transition-colors ${
        pr.reviewId ? 'cursor-pointer hover:bg-[var(--bg-surface-hover)]' : ''
      } ${pr.reviewStatus === 'reviewing' ? 'bg-brand-500/[0.02]' : ''}`}
    >
      {/* Avatar */}
      {pr.authorAvatar ? (
        <img src={pr.authorAvatar} alt={pr.author} className="w-9 h-9 rounded-full object-cover flex-shrink-0 border t-border-subtle" />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-surface-700 to-surface-800 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
          {pr.author?.substring(0, 2).toUpperCase()}
        </div>
      )}

      {/* Title + meta */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold t-text group-hover:text-brand-400 transition-colors truncate">
          {pr.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs t-text-muted mt-1 truncate">
          <span className="font-mono t-text-secondary truncate">{pr.repoName}</span>
          <span className="opacity-50">·</span>
          <span>#{pr.number}</span>
          <span className="opacity-50 hidden sm:inline">·</span>
          <span className="hidden sm:inline">by {pr.author}</span>
          <span className="opacity-50 hidden md:inline">·</span>
          <span className="hidden md:inline">{timeAgo(pr.updatedAt)}</span>
        </div>
      </div>

      {/* Status + score */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {pr.reviewScore != null && (
          <span
            className={`text-xs font-bold tabular-nums hidden sm:inline ${
              pr.reviewScore >= 80
                ? 'text-brand-400'
                : pr.reviewScore >= 60
                ? 'text-amber-400'
                : 'text-red-400'
            }`}
          >
            {pr.reviewScore}
          </span>
        )}
        <StatusBadge />

        {/* Action */}
        {pr.reviewStatus === 'completed' && pr.reviewId ? (
          <button
            onClick={(e) => { e.stopPropagation(); onClick(pr.reviewId) }}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md t-bg-input border t-border-subtle text-xs font-medium t-text-secondary hover:t-text transition-all whitespace-nowrap"
          >
            <Eye size={12} />
            View
          </button>
        ) : pr.reviewStatus === 'reviewing' ? (
          <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-xs font-medium text-amber-400 whitespace-nowrap">
            <Loader2 size={12} className="animate-spin" />
            Analyzing
          </span>
        ) : (
          <button
            onClick={(e) => onTriggerReview(e, pr)}
            disabled={isReviewingNow}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-xs font-medium shadow-sm transition-all disabled:opacity-60 whitespace-nowrap"
          >
            <Sparkles size={12} />
            Review
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────
export default function PullRequestsPage() {
  const navigate = useNavigate()
  const { githubConnected } = useAuth()
  const [prs, setPrs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [reviewingId, setReviewingId] = useState(null)
  const pollRef = useRef(null)

  useEffect(() => {
    if (githubConnected) fetchPrs()
    else setLoading(false)
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [githubConnected])

  useEffect(() => {
    const hasReviewing = prs.some((p) => p.reviewStatus === 'reviewing')
    if (hasReviewing && !pollRef.current) {
      pollRef.current = setInterval(async () => {
        try {
          const response = await api.get('/prs')
          const fresh = response.data?.data?.prs || []
          setPrs(fresh)
          if (!fresh.some((p) => p.reviewStatus === 'reviewing')) {
            clearInterval(pollRef.current)
            pollRef.current = null
          }
        } catch { /* silent */ }
      }, 5000)
    } else if (!hasReviewing && pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [prs])

  const fetchPrs = async () => {
    try {
      setError(null)
      const response = await api.get('/prs')
      setPrs(response.data?.data?.prs || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch pull requests')
    } finally {
      setLoading(false)
    }
  }

  const handleTriggerReview = async (e, pr) => {
    e.stopPropagation()
    const key = `${pr.repoId}:${pr.number}`
    setReviewingId(key)

    setPrs((prev) => prev.map((p) =>
      p.number === pr.number && p.repoId === pr.repoId ? { ...p, reviewStatus: 'reviewing' } : p
    ))

    try {
      const response = await api.post('/prs/review', { repoId: pr.repoId, prNumber: pr.number })
      const review = response.data?.data?.review
      setPrs((prev) => prev.map((p) =>
        p.number === pr.number && p.repoId === pr.repoId
          ? { ...p, reviewStatus: review.status, reviewScore: review.score, reviewVerdict: review.verdict, reviewId: review.id }
          : p
      ))
    } catch (err) {
      setPrs((prev) => prev.map((p) =>
        p.number === pr.number && p.repoId === pr.repoId ? { ...p, reviewStatus: null } : p
      ))
      setError(err.response?.data?.message || 'Failed to run AI review')
      setTimeout(() => setError(null), 4000)
    } finally {
      setReviewingId(null)
    }
  }

  const filteredPRs = useMemo(() => {
    return prs.filter((pr) => {
      if (filter === 'all') return true
      if (filter === 'reviewed') return pr.reviewStatus === 'completed'
      if (filter === 'reviewing') return pr.reviewStatus === 'reviewing'
      if (filter === 'pending') return !pr.reviewStatus || pr.reviewStatus === 'pending'
      return true
    })
  }, [prs, filter])

  const timeAgo = (dateStr) => {
    if (!dateStr) return ''
    const now = new Date()
    const date = new Date(dateStr)
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  const reviewingCount = prs.filter((p) => p.reviewStatus === 'reviewing').length

  // ─── Not connected ─────────────────────────────────────
  if (!githubConnected && !loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-xl font-semibold t-text mb-1">Pull Requests</h1>
          <p className="t-text-muted text-sm">AI-reviewed pull requests across your enabled repositories.</p>
        </div>
        <StateContainer
          icon={Github}
          title="Connect GitHub to get started"
          description="Link GitHub, enable repositories, and we'll auto-review every new pull request."
          action={
            <button
              onClick={() => navigate('/dashboard/integrations')}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium shadow-sm transition-all"
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
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8 animate-fade-in">
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

      {/* Reviewing notice */}
      {reviewingCount > 0 && (
        <div className="mb-5 p-3 rounded-lg border bg-brand-500/5 border-brand-500/20 text-brand-400 text-sm flex items-center gap-2">
          <Loader2 size={14} className="animate-spin" />
          <span>
            <span className="font-semibold">{reviewingCount}</span> pull request{reviewingCount > 1 ? 's' : ''} being analyzed
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold t-text mb-1">Pull Requests</h1>
          <p className="t-text-muted text-sm">
            {loading ? 'Loading...' : `${prs.length} pull requests`}
          </p>
        </div>
        <button
          onClick={fetchPrs}
          disabled={loading}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md t-bg-input border t-border-subtle t-text-secondary hover:t-text text-xs font-medium transition-all disabled:opacity-50"
        >
          <RefreshCw size={12} />
          Refresh
        </button>
      </div>

      {/* Filter row */}
      <div className="mb-5 flex items-center gap-1 t-bg-input border t-border-subtle rounded-md p-0.5 w-fit">
        {[
          { key: 'all', label: 'All', count: prs.length },
          { key: 'reviewed', label: 'Reviewed', count: prs.filter((p) => p.reviewStatus === 'completed').length },
          { key: 'reviewing', label: 'Reviewing', count: reviewingCount },
          { key: 'pending', label: 'Pending', count: prs.filter((p) => !p.reviewStatus || p.reviewStatus === 'pending').length },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 h-7 rounded text-xs font-medium transition-all whitespace-nowrap ${
              filter === f.key ? 't-bg-surface t-text shadow-sm' : 't-text-muted hover:t-text'
            }`}
          >
            {f.label}
            <span className="ml-1.5 opacity-60 tabular-nums">{f.count}</span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="t-bg-card border t-border-subtle rounded-lg overflow-hidden">
        {loading ? (
          <div>
            {Array.from({ length: 4 }).map((_, i) => <RowSkeleton key={i} />)}
          </div>
        ) : prs.length === 0 ? (
          <StateContainer
            icon={Code2}
            title="No enabled repositories"
            description="Enable repositories first. Any pull request opened on them will be reviewed automatically."
            action={
              <button
                onClick={() => navigate('/dashboard/repositories')}
                className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium shadow-sm transition-all"
              >
                <Code2 size={14} />
                Go to Repositories
                <ArrowRight size={13} />
              </button>
            }
          />
        ) : filteredPRs.length === 0 ? (
          <StateContainer
            icon={GitPullRequest}
            title="Nothing here"
            description="No pull requests match this filter."
            action={
              <button onClick={() => setFilter('all')} className="text-brand-400 hover:text-brand-300 text-sm font-medium">
                Show all
              </button>
            }
          />
        ) : (
          <div>
            {filteredPRs.map((pr) => (
              <PRRow
                key={`${pr.repoId}-${pr.number}`}
                pr={pr}
                onClick={(reviewId) => navigate(`/dashboard/pr/${reviewId}`)}
                onTriggerReview={handleTriggerReview}
                reviewingId={reviewingId}
                timeAgo={timeAgo}
              />
            ))}
          </div>
        )}
      </div>

      {!loading && filteredPRs.length > 0 && (
        <p className="text-center text-xs t-text-muted mt-4">
          Showing {filteredPRs.length} of {prs.length}
        </p>
      )}
    </div>
  )
}
