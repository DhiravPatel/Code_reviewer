import { useNavigate } from 'react-router-dom'
import { Eye, Check, Clock, AlertCircle, Filter, GitBranch, Loader2, Sparkles, RefreshCw } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { api } from '../../shared/api/axios'
import { useAuth } from '../../shared/context/AuthContext'

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
    if (githubConnected) {
      fetchPrs()
    } else {
      setLoading(false)
    }
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [githubConnected])

  // Auto-poll when any PR is in "reviewing" status
  useEffect(() => {
    const hasReviewing = prs.some((p) => p.reviewStatus === 'reviewing')
    if (hasReviewing && !pollRef.current) {
      pollRef.current = setInterval(async () => {
        try {
          const response = await api.get('/prs')
          const fresh = response.data?.data?.prs || []
          setPrs(fresh)
          // Stop polling if no more reviewing
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

    // Optimistically set to "reviewing" in the UI immediately
    setPrs((prev) =>
      prev.map((p) =>
        p.number === pr.number && p.repoId === pr.repoId
          ? { ...p, reviewStatus: 'reviewing' }
          : p
      )
    )

    try {
      const response = await api.post('/prs/review', {
        repoId: pr.repoId,
        prNumber: pr.number,
      })
      const review = response.data?.data?.review
      setPrs((prev) =>
        prev.map((p) =>
          p.number === pr.number && p.repoId === pr.repoId
            ? { ...p, reviewStatus: review.status, reviewScore: review.score, reviewVerdict: review.verdict, reviewId: review.id }
            : p
        )
      )
    } catch (err) {
      // Revert optimistic update
      setPrs((prev) =>
        prev.map((p) =>
          p.number === pr.number && p.repoId === pr.repoId
            ? { ...p, reviewStatus: null }
            : p
        )
      )
      setError(err.response?.data?.message || 'Failed to run AI review')
      setTimeout(() => setError(null), 4000)
    } finally {
      setReviewingId(null)
    }
  }

  const getStatusConfig = (pr) => {
    if (pr.reviewStatus === 'completed') {
      if (pr.reviewVerdict === 'approved') {
        return { class: 'badge-success', icon: Check, label: 'Approved' }
      }
      return { class: 'badge-danger', icon: AlertCircle, label: 'Changes Requested' }
    }
    if (pr.reviewStatus === 'reviewing') {
      return { class: 'badge-warning', icon: Loader2, label: 'Reviewing...', spin: true }
    }
    return { class: 'badge-info', icon: Clock, label: 'Not Reviewed' }
  }

  const filteredPRs = prs.filter((pr) => {
    if (filter === 'all') return true
    if (filter === 'reviewed') return pr.reviewStatus === 'completed'
    if (filter === 'reviewing') return pr.reviewStatus === 'reviewing'
    if (filter === 'pending') return !pr.reviewStatus || pr.reviewStatus === 'pending'
    return true
  })

  const timeAgo = (dateStr) => {
    const now = new Date()
    const date = new Date(dateStr)
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  const reviewingCount = prs.filter((p) => p.reviewStatus === 'reviewing').length

  if (!githubConnected) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl animate-fade-in">
        <div className="t-card p-12 text-center">
          <GitBranch size={48} className="t-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold t-text mb-2">GitHub Not Connected</h3>
          <p className="t-text-muted text-sm mb-6">Connect your GitHub account and enable repositories to see pull requests.</p>
          <button onClick={() => navigate('/dashboard/integrations')} className="btn-primary text-sm px-6">
            Connect GitHub
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl animate-fade-in">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-brand-400" />
          <span className="ml-3 t-text-muted">Fetching pull requests...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl animate-fade-in">
      {/* Error toast */}
      {error && (
        <div className="mb-6 p-4 rounded-xl border bg-red-500/10 border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2 animate-fade-in">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Reviewing banner */}
      {reviewingCount > 0 && (
        <div className="mb-6 p-4 rounded-xl border bg-brand-500/10 border-brand-500/20 text-brand-400 text-sm font-medium flex items-center gap-3 animate-fade-in">
          <Loader2 size={18} className="animate-spin" />
          <span>{reviewingCount} pull request{reviewingCount > 1 ? 's are' : ' is'} being reviewed by AI... Results will appear here and on GitHub.</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold t-text tracking-tight mb-1">Pull Requests</h1>
          <p className="t-text-muted">Review and manage pull requests from your enabled repositories</p>
        </div>
        <button onClick={fetchPrs} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl t-bg-input border t-border-subtle t-text-secondary hover:t-text text-sm font-medium transition-all">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Filter size={16} className="t-text-muted" />
        {[
          { key: 'all', label: 'All', count: prs.length },
          { key: 'reviewed', label: 'Reviewed', count: prs.filter((p) => p.reviewStatus === 'completed').length },
          { key: 'reviewing', label: 'Reviewing', count: prs.filter((p) => p.reviewStatus === 'reviewing').length },
          { key: 'pending', label: 'Not Reviewed', count: prs.filter((p) => !p.reviewStatus || p.reviewStatus === 'pending').length },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f.key
                ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30'
                : 't-bg-input t-text-secondary border t-border-subtle hover:t-text hover:bg-surface-700/30'
            }`}
          >
            {f.label}
            <span className="ml-1.5 opacity-60">{f.count}</span>
          </button>
        ))}
      </div>

      {/* PRs List */}
      <div className="space-y-3">
        {filteredPRs.map((pr, idx) => {
          const statusConfig = getStatusConfig(pr)
          const StatusIcon = statusConfig.icon
          const isReviewing = reviewingId === `${pr.repoId}:${pr.number}` || pr.reviewStatus === 'reviewing'

          return (
            <div
              key={`${pr.repoId}-${pr.number}`}
              className={`t-card-hover p-5 lg:p-6 flex flex-col md:flex-row md:items-center gap-4 group cursor-pointer ${
                pr.reviewStatus === 'reviewing' ? 'border-brand-500/20 bg-brand-500/[0.02]' : ''
              }`}
              onClick={() => {
                if (pr.reviewId) {
                  navigate(`/dashboard/pr/${pr.reviewId}`)
                }
              }}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              {/* Avatar */}
              {pr.authorAvatar ? (
                <img src={pr.authorAvatar} alt={pr.author} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-surface-700 to-surface-800 border border-surface-600/50 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {pr.author?.substring(0, 2).toUpperCase()}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm lg:text-base font-semibold t-text group-hover:text-brand-400 transition-colors truncate mb-1">
                  {pr.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs t-text-muted">
                  <span className="font-mono t-text-secondary">{pr.repoName}</span>
                  <span>&middot;</span>
                  <span>#{pr.number}</span>
                  <span>&middot;</span>
                  <span>{pr.branch}</span>
                  <span>&middot;</span>
                  <span>by {pr.author}</span>
                  <span>&middot;</span>
                  <span>{timeAgo(pr.updatedAt)}</span>
                </div>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                {/* Score if reviewed */}
                {pr.reviewScore != null && (
                  <span className={`text-sm font-bold ${pr.reviewScore >= 80 ? 'text-brand-400' : pr.reviewScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                    {pr.reviewScore}/100
                  </span>
                )}

                {/* Status badge */}
                <span className={statusConfig.class}>
                  <StatusIcon size={12} className={statusConfig.spin ? 'animate-spin' : ''} />
                  {statusConfig.label}
                </span>

                {/* Action button */}
                {pr.reviewStatus === 'completed' && pr.reviewId ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/dashboard/pr/${pr.reviewId}`)
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 transition-all text-xs font-medium border border-brand-500/20"
                  >
                    <Eye size={14} />
                    View
                  </button>
                ) : pr.reviewStatus === 'reviewing' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
                    <Loader2 size={14} className="animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  <button
                    onClick={(e) => handleTriggerReview(e, pr)}
                    disabled={isReviewing}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500 text-white hover:bg-brand-600 transition-all text-xs font-medium shadow-sm shadow-brand-500/20 disabled:opacity-60"
                  >
                    <Sparkles size={14} />
                    AI Review
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredPRs.length === 0 && (
        <div className="t-card p-12 text-center">
          <GitBranch size={48} className="t-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold t-text mb-2">No pull requests found</h3>
          <p className="t-text-muted text-sm">
            {prs.length === 0
              ? 'Enable repositories first, then open pull requests will appear here. New PRs are auto-reviewed.'
              : 'Try adjusting your filters.'}
          </p>
          {prs.length === 0 && (
            <button onClick={() => navigate('/dashboard/repositories')} className="btn-primary text-sm px-6 mt-4">
              Go to Repositories
            </button>
          )}
        </div>
      )}
    </div>
  )
}
