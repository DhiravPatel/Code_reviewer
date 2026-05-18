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

// ─── PR Row — magazine article preview style ─────────────────
function PRRow({ pr, onClick, onTriggerReview, reviewingId, timeAgo, delay = 0 }) {
  const isReviewingNow = reviewingId === `${pr.repoId}:${pr.number}` || pr.reviewStatus === 'reviewing'
  const isCompleted = pr.reviewStatus === 'completed'

  const scoreColor =
    pr.reviewScore == null ? 'var(--text-faint)' :
    pr.reviewScore >= 80 ? '#10b981' :
    pr.reviewScore >= 60 ? '#b45309' : '#dc2626'

  const statusText = (() => {
    if (isCompleted) return pr.reviewVerdict === 'approved' ? 'Approved' : 'Changes Requested'
    if (pr.reviewStatus === 'reviewing') return 'Reviewing'
    return 'Pending'
  })()

  const statusColor = (() => {
    if (isCompleted) return pr.reviewVerdict === 'approved' ? '#10b981' : '#dc2626'
    if (pr.reviewStatus === 'reviewing') return '#b45309'
    return 'var(--text-muted)'
  })()

  const StatusIcon = (() => {
    if (isCompleted) return pr.reviewVerdict === 'approved' ? Check : AlertCircle
    if (pr.reviewStatus === 'reviewing') return Loader2
    return Clock
  })()

  return (
    <article
      onClick={() => pr.reviewId && onClick(pr.reviewId)}
      className={`group relative transition-all duration-500 ease-editorial border-b t-border-subtle last:border-b-0 ${
        pr.reviewId ? 'cursor-pointer' : ''
      } ${pr.reviewStatus === 'reviewing' ? 'bg-brand-500/[0.025]' : ''}`}
      style={{
        animation: `rowFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`,
      }}
      onMouseEnter={(e) => {
        if (pr.reviewId) e.currentTarget.style.background = 'var(--bg-surface-hover)'
      }}
      onMouseLeave={(e) => {
        if (pr.reviewStatus !== 'reviewing') e.currentTarget.style.background = ''
      }}
    >
      {/* Animated left-edge accent that grows on hover */}
      <span
        className="absolute left-0 top-6 bottom-6 w-[2px] origin-top transition-transform duration-700 ease-editorial group-hover:scale-y-100 scale-y-0"
        style={{ background: '#10b981' }}
      />

      <div className="flex items-start gap-8 lg:gap-10 px-8 lg:px-10 py-8">
        {/* LEAD: Big serif score */}
        <div className="flex-shrink-0 w-[88px] flex flex-col items-start">
          {pr.reviewScore != null ? (
            <>
              <span
                className="page-display tabular-nums leading-none"
                style={{ fontSize: 60, color: scoreColor, letterSpacing: '-0.02em' }}
              >
                {pr.reviewScore}
              </span>
              <span className="eyebrow text-[9px] mt-2">/ 100</span>
            </>
          ) : (
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontStyle: 'italic',
                fontSize: 56,
                color: 'var(--text-faint)',
                lineHeight: 1,
              }}
            >
              —
            </span>
          )}
        </div>

        {/* BODY: title + meta + status */}
        <div className="flex-1 min-w-0 pt-1">
          {/* Meta eyebrow line */}
          <div className="flex items-center gap-2.5 text-[10.5px] uppercase tracking-[0.22em] font-semibold mb-3 t-text-muted">
            <span className="font-mono normal-case tracking-normal text-[11.5px]" style={{ color: '#10b981' }}>
              {pr.repoName}
            </span>
            <span className="opacity-50">·</span>
            <span>#{pr.number}</span>
            <span className="opacity-50">·</span>
            <span className="normal-case tracking-normal text-[11.5px] t-text-secondary">by {pr.author}</span>
            <span className="opacity-50">·</span>
            <span className="normal-case tracking-normal text-[11.5px]">{timeAgo(pr.updatedAt)}</span>
          </div>

          {/* Title (serif, generous size, no truncate) */}
          <h3
            className="page-display t-text transition-colors duration-500 ease-editorial mb-4"
            style={{ fontSize: 28, lineHeight: 1.08 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '')}
          >
            {pr.title}
          </h3>

          {/* Footer: status badge */}
          <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: statusColor }}>
            <StatusIcon size={11} className={pr.reviewStatus === 'reviewing' ? 'animate-spin' : ''} />
            {statusText}
          </div>
        </div>

        {/* TAIL: action */}
        <div className="flex-shrink-0 self-center">
          {isCompleted && pr.reviewId ? (
            <span
              className="inline-flex items-center text-[10.5px] font-semibold uppercase tracking-[0.22em] overflow-hidden"
              style={{ color: '#10b981' }}
            >
              <span
                className="inline-block whitespace-nowrap transition-all duration-500 ease-editorial"
                style={{
                  maxWidth: 0,
                  opacity: 0,
                  transform: 'translateX(8px)',
                }}
                ref={(el) => {
                  if (!el) return
                  const row = el.closest('article')
                  if (!row || row.dataset.readHover) return
                  row.dataset.readHover = '1'
                  row.addEventListener('mouseenter', () => {
                    el.style.maxWidth = '160px'
                    el.style.opacity = '1'
                    el.style.transform = 'translateX(0)'
                    el.style.marginRight = '10px'
                  })
                  row.addEventListener('mouseleave', () => {
                    el.style.maxWidth = '0'
                    el.style.opacity = '0'
                    el.style.transform = 'translateX(8px)'
                    el.style.marginRight = '0'
                  })
                }}
              >
                Read review
              </span>
              <ArrowRight
                size={16}
                className="transition-transform duration-500 ease-editorial group-hover:translate-x-1 flex-shrink-0"
                style={{ color: '#10b981' }}
              />
            </span>
          ) : pr.reviewStatus === 'reviewing' ? (
            <span className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#b45309' }}>
              <Loader2 size={13} className="animate-spin" />
              <span className="hidden lg:inline">Analyzing</span>
            </span>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onTriggerReview(e, pr) }}
              disabled={isReviewingNow}
              className="press-scale inline-flex items-center gap-2 h-9 px-5 rounded-none text-[10px] font-semibold uppercase tracking-[0.22em] whitespace-nowrap disabled:opacity-60"
              style={{ background: '#1a1612', color: '#fff', border: '1px solid #1a1612' }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = '#10b981'
                  e.currentTarget.style.borderColor = '#10b981'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1a1612'
                e.currentTarget.style.borderColor = '#1a1612'
              }}
            >
              <Sparkles size={11} />
              Run review
            </button>
          )}
        </div>
      </div>
    </article>
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

  const darkBtnHover = (e) => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.borderColor = '#10b981' }
  const darkBtnLeave = (e) => { e.currentTarget.style.background = '#1a1612'; e.currentTarget.style.borderColor = '#1a1612' }

  // ─── Not connected ─────────────────────────────────────
  if (!githubConnected && !loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 animate-fade-in">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="rule rule-grow" />
            <span className="eyebrow">Pull requests</span>
          </div>
          <h1 className="page-display t-text" style={{ fontSize: 56, lineHeight: 1.04 }}>
            AI-reviewed{' '}
            <span className="italic-accent">pull requests.</span>
          </h1>
          <p className="t-text-muted text-[15px] mt-5 leading-[1.7] max-w-xl">
            Across your enabled repositories.
          </p>
        </div>
        <StateContainer
          icon={Github}
          title="Connect GitHub to get started"
          description="Link GitHub, enable repositories, and we'll auto-review every new pull request."
          action={
            <button
              onClick={() => navigate('/dashboard/integrations')}
              className="press-scale inline-flex items-center gap-2 h-10 px-6 rounded-none text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ background: '#1a1612', color: '#fff', border: '1px solid #1a1612' }}
              onMouseEnter={darkBtnHover}
              onMouseLeave={darkBtnLeave}
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
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 animate-fade-in">
      {/* Error banner */}
      {error && (
        <div className="mb-5 p-3.5 border bg-red-500/10 border-red-500/30 text-red-400 text-sm flex items-center gap-2">
          <AlertCircle size={14} />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="hover:text-red-300">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Reviewing notice */}
      {reviewingCount > 0 && (
        <div className="mb-5 p-4 border border-brand-500/30 bg-brand-500/[0.04] text-brand-500 text-sm flex items-center gap-3">
          <Loader2 size={14} className="animate-spin" />
          <span className="page-display" style={{ fontSize: 18 }}>
            <span className="italic-accent">{reviewingCount}</span> pull request{reviewingCount > 1 ? 's' : ''} being analyzed
          </span>
        </div>
      )}

      {/* Editorial header */}
      <div className="mb-12 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="rule rule-grow" />
            <span className="eyebrow">Pull requests</span>
          </div>
          <h1 className="page-display t-text" style={{ fontSize: 56, lineHeight: 1.04 }}>
            Your{' '}
            <span className="italic-accent">pull requests.</span>
          </h1>
          <p className="t-text-muted text-[15px] mt-5 leading-[1.7]">
            {loading ? 'Loading…' : (
              <>
                <span className="t-text-secondary">{prs.length}</span> pull requests
              </>
            )}
          </p>
        </div>
        <button
          onClick={fetchPrs}
          disabled={loading}
          className="press-scale inline-flex items-center gap-1.5 h-9 px-4 rounded-none t-bg-input border t-border-subtle t-text-secondary hover:t-text text-[10.5px] font-semibold uppercase tracking-[0.18em] disabled:opacity-50"
        >
          <RefreshCw size={12} />
          Refresh
        </button>
      </div>

      {/* Filter row */}
      <div className="mb-6 flex items-center gap-0 t-bg-input border t-border-subtle p-1 rounded-none w-fit">
        {[
          { key: 'all', label: 'All', count: prs.length },
          { key: 'reviewed', label: 'Reviewed', count: prs.filter((p) => p.reviewStatus === 'completed').length },
          { key: 'reviewing', label: 'Reviewing', count: reviewingCount },
          { key: 'pending', label: 'Pending', count: prs.filter((p) => !p.reviewStatus || p.reviewStatus === 'pending').length },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 h-8 text-[10.5px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-500 ease-editorial ${
              filter === f.key ? 't-bg-surface t-text' : 't-text-muted hover:t-text'
            }`}
          >
            {f.label}
            <span className="ml-2 opacity-60 tabular-nums">{f.count}</span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="t-bg-card border t-border-subtle rounded-none overflow-hidden">
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
                className="press-scale inline-flex items-center gap-2 h-10 px-6 rounded-none text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ background: '#1a1612', color: '#fff', border: '1px solid #1a1612' }}
                onMouseEnter={darkBtnHover}
                onMouseLeave={darkBtnLeave}
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
              <button
                onClick={() => setFilter('all')}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] pb-1"
                style={{ color: '#10b981', borderBottom: '1px solid #10b981' }}
              >
                Show all
              </button>
            }
          />
        ) : (
          <div>
            {filteredPRs.map((pr, i) => (
              <PRRow
                key={`${pr.repoId}-${pr.number}`}
                pr={pr}
                onClick={(reviewId) => navigate(`/dashboard/pr/${reviewId}`)}
                onTriggerReview={handleTriggerReview}
                reviewingId={reviewingId}
                timeAgo={timeAgo}
                delay={Math.min(i * 40, 600)}
              />
            ))}
          </div>
        )}
      </div>

      {!loading && filteredPRs.length > 0 && (
        <p className="text-center text-[11px] t-text-muted mt-6 tracking-[0.18em] uppercase">
          Showing {filteredPRs.length} of {prs.length}
        </p>
      )}
    </div>
  )
}
