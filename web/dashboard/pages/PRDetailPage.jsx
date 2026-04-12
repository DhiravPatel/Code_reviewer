import { ArrowLeft, AlertTriangle, Lightbulb, Shield, FileText, GitBranch, Plus, Minus, CheckCircle, Clock, Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../../shared/api/axios'

export default function PRDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await api.get(`/prs/review/${id}`)
        setReview(response.data?.data?.review || null)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load review')
      } finally {
        setLoading(false)
      }
    }
    fetchReview()
  }, [id])

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-brand-400" />
        <span className="ml-3 t-text-muted">Loading review...</span>
      </div>
    )
  }

  if (error || !review) {
    return (
      <div className="p-8 text-center">
        <p className="t-text-secondary">{error || 'Review not found.'}</p>
        <button onClick={() => navigate('/dashboard/pull-requests')} className="btn-primary text-sm px-6 mt-4">
          Back to Pull Requests
        </button>
      </div>
    )
  }

  const comments = (review.reviewComments || [])
  const summary = (review.summary || { criticalIssues: 0, warnings: 0, suggestions: 0 })

  const getCommentStyle = (type) => {
    switch (type) {
      case 'security':
        return {
          bg: 'bg-red-500/8',
          border: 'border-red-500/20',
          iconBg: 'bg-red-500/15',
          iconColor: 'text-red-400',
          titleColor: 'text-red-400',
          Icon: Shield,
        }
      case 'warning':
        return {
          bg: 'bg-amber-500/8',
          border: 'border-amber-500/20',
          iconBg: 'bg-amber-500/15',
          iconColor: 'text-amber-400',
          titleColor: 'text-amber-400',
          Icon: AlertTriangle,
        }
      case 'suggestion':
      default:
        return {
          bg: 'bg-brand-500/8',
          border: 'border-brand-500/20',
          iconBg: 'bg-brand-500/15',
          iconColor: 'text-brand-400',
          titleColor: 'text-brand-400',
          Icon: Lightbulb,
        }
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-brand-400'
    if (score >= 60) return 'text-amber-400'
    return 'text-red-400'
  }

  const getVerdictBadge = (verdict) => {
    if (verdict === 'approved') return 'badge-success'
    return 'badge-danger'
  }

  const getVerdictLabel = (verdict) => {
    if (verdict === 'approved') return 'Approved'
    return 'Changes Requested'
  }

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

  return (
    <div className="p-6 lg:p-8 max-w-5xl animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/pull-requests')}
        className="flex items-center gap-2 t-text-secondary hover:t-text transition-colors mb-6 text-sm font-medium group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Pull Requests
      </button>

      {/* Header */}
      <div className="t-card p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl lg:text-2xl font-bold t-text leading-tight mb-2">{review.prTitle}</h1>
            <div className="flex flex-wrap items-center gap-2 text-xs t-text-muted">
              <span className="font-mono t-text-secondary">{review.repo?.fullName || ''}</span>
              <span>&middot;</span>
              <span>PR #{review.prNumber}</span>
              <span>&middot;</span>
              <span>by {review.prAuthor}</span>
              <span>&middot;</span>
              <span>Reviewed {timeAgo(review.reviewedAt)}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-info">
              <GitBranch size={12} />
              {review.prBranch}
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-brand-400 bg-brand-500/10 px-2 py-1 rounded-md">
                <Plus size={12} />{review.additions}
              </span>
              <span className="flex items-center gap-1 text-red-400 bg-red-500/10 px-2 py-1 rounded-md">
                <Minus size={12} />{review.deletions}
              </span>
              <span className="flex items-center gap-1 t-text-secondary t-bg-input px-2 py-1 rounded-md">
                <FileText size={12} />{review.filesChanged} files
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviewing / pending state */}
      {review.status !== 'completed' && (
        <div className="t-card p-8 text-center mb-6">
          {review.status === 'reviewing' ? (
            <>
              <Loader2 size={36} className="animate-spin text-brand-400 mx-auto mb-3" />
              <h3 className="t-text font-semibold">AI Review in Progress...</h3>
              <p className="t-text-muted text-sm mt-1">This usually takes 15-30 seconds.</p>
            </>
          ) : review.status === 'failed' ? (
            <>
              <AlertTriangle size={36} className="text-red-400 mx-auto mb-3" />
              <h3 className="t-text font-semibold">Review Failed</h3>
              <p className="t-text-muted text-sm mt-1">The AI review encountered an error. Please try again.</p>
            </>
          ) : (
            <>
              <Clock size={36} className="t-text-secondary mx-auto mb-3" />
              <h3 className="t-text font-semibold">Pending Review</h3>
              <p className="t-text-muted text-sm mt-1">This PR hasn't been reviewed yet.</p>
            </>
          )}
        </div>
      )}

      {/* AI Review Comments */}
      {review.status === 'completed' && comments.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold t-text mb-4">AI Review Comments</h2>
          <div className="space-y-4">
            {comments.map((comment, idx) => {
              const style = getCommentStyle(comment.type)
              const CommentIcon = style.Icon
              return (
                <div
                  key={idx}
                  className={`rounded-2xl ${style.bg} border ${style.border} p-5 lg:p-6 transition-all hover:shadow-lg`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl ${style.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <CommentIcon className={style.iconColor} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className={`font-semibold ${style.titleColor}`}>{comment.title}</h3>
                        {comment.file && (
                          <span className="text-[10px] t-text-faint font-mono t-bg-surface px-2 py-0.5 rounded">
                            {comment.file}{comment.line ? `:${comment.line}` : ''}
                          </span>
                        )}
                      </div>
                      <p className="t-text-secondary text-sm leading-relaxed mb-3">{comment.description}</p>
                      {comment.details && comment.details.length > 0 && (
                        <ul className="space-y-1.5">
                          {comment.details.map((detail, didx) => (
                            <li key={didx} className="flex items-start gap-2 t-text-secondary text-sm">
                              <span className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${style.iconColor.replace('text-', 'bg-')}`} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Review Summary */}
      {review.status === 'completed' && (
        <div className="t-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold t-text">Review Summary</h3>
            <span className={getVerdictBadge(review.verdict)}>
              {review.verdict === 'approved' && <CheckCircle size={12} />}
              {review.verdict === 'changes_requested' && <AlertTriangle size={12} />}
              {getVerdictLabel(review.verdict)}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
              <p className="t-text-muted text-xs font-medium uppercase tracking-wider mb-2">Critical</p>
              <p className="text-2xl lg:text-3xl font-bold text-red-400">{summary.criticalIssues || 0}</p>
            </div>
            <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
              <p className="t-text-muted text-xs font-medium uppercase tracking-wider mb-2">Warnings</p>
              <p className="text-2xl lg:text-3xl font-bold text-amber-400">{summary.warnings || 0}</p>
            </div>
            <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
              <p className="t-text-muted text-xs font-medium uppercase tracking-wider mb-2">Suggestions</p>
              <p className="text-2xl lg:text-3xl font-bold text-brand-400">{summary.suggestions || 0}</p>
            </div>
            <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
              <p className="t-text-muted text-xs font-medium uppercase tracking-wider mb-2">Score</p>
              <p className={`text-2xl lg:text-3xl font-bold ${getScoreColor(review.score)}`}>
                {review.score}/100
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
