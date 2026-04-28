import {
  ArrowLeft, AlertTriangle, Lightbulb, Shield, FileText, GitBranch, Plus, Minus,
  CheckCircle, Clock, Loader2, Bug, Zap, Wrench, Sparkles, ChevronDown, ChevronRight
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../../shared/api/axios'
import Mermaid from '../../shared/components/Mermaid'

// ─── Helpers ────────────────────────────────────────────────────

const derivePriority = (c) => {
  if (c.priority) return c.priority
  if (c.severity === 'critical' || c.type === 'security') return 'P1'
  if (c.severity === 'warning' || c.type === 'bug' || c.type === 'performance') return 'P2'
  return 'P3'
}

const priorityConfig = {
  P1: { label: 'P1', color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', dot: 'bg-red-500' },
  P2: { label: 'P2', color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30', dot: 'bg-amber-500' },
  P3: { label: 'P3', color: 'text-cyan-400', bg: 'bg-cyan-500/15', border: 'border-cyan-500/30', dot: 'bg-cyan-500' },
}

const typeIcons = {
  security: Shield,
  bug: Bug,
  performance: Zap,
  maintainability: Wrench,
  style: Sparkles,
  suggestion: Lightbulb,
  warning: AlertTriangle,
}

const typeColors = {
  security: 'text-red-400',
  bug: 'text-orange-400',
  performance: 'text-amber-400',
  maintainability: 'text-blue-400',
  style: 'text-purple-400',
  suggestion: 'text-cyan-400',
  warning: 'text-amber-400',
}

const getScoreColor = (score) => {
  if (score >= 80) return 'text-brand-400'
  if (score >= 60) return 'text-amber-400'
  return 'text-red-400'
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

// ─── Components ─────────────────────────────────────────────────

function ReviewCommentCard({ comment }) {
  const [expanded, setExpanded] = useState(true)
  const priority = derivePriority(comment)
  const pConf = priorityConfig[priority]
  const TypeIcon = typeIcons[comment.type] || Lightbulb
  const typeColor = typeColors[comment.type] || 'text-brand-400'
  const startLine = comment.startLine ?? comment.line
  const endLine = comment.endLine ?? comment.line
  const lineRef = startLine
    ? `:${startLine}${endLine && endLine !== startLine ? `-${endLine}` : ''}`
    : ''
  const rationale = (comment.rationale && comment.rationale.length > 0)
    ? comment.rationale
    : (comment.details || [])
  const hasCode = (comment.codeBefore && comment.codeBefore.trim()) ||
                  (comment.codeAfter && comment.codeAfter.trim())

  return (
    <div className={`rounded-2xl t-bg-card border ${pConf.border} p-5 lg:p-6 transition-all hover:shadow-lg`}>
      <div className="flex gap-4">
        <div className={`w-10 h-10 rounded-xl ${pConf.bg} border ${pConf.border} flex items-center justify-center flex-shrink-0`}>
          <TypeIcon className={typeColor} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${pConf.bg} ${pConf.color} text-[10px] font-bold uppercase tracking-wider border ${pConf.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${pConf.dot}`} />
              {pConf.label}
            </span>
            <span className="text-[10px] t-text-muted uppercase tracking-wider font-semibold">{comment.type || 'suggestion'}</span>
            <h3 className="font-semibold t-text flex-1 min-w-0">{comment.title}</h3>
          </div>
          {comment.file && (
            <div className="mb-3">
              <span className="text-[11px] t-text-faint font-mono t-bg-surface px-2 py-1 rounded border t-border-subtle">
                {comment.file}{lineRef}
              </span>
            </div>
          )}
          <p className="t-text-secondary text-sm leading-relaxed mb-3">{comment.description}</p>

          {rationale.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {rationale.map((r, i) => (
                <li key={i} className="flex items-start gap-2 t-text-secondary text-sm">
                  <span className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${pConf.dot}`} />
                  {r}
                </li>
              ))}
            </ul>
          )}

          {hasCode && (
            <div className="mt-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors mb-2"
              >
                {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                Suggested change
              </button>

              {expanded && (
                <div className="space-y-2">
                  {comment.codeBefore && comment.codeBefore.trim() && (
                    <div>
                      <div className="text-[10px] font-semibold t-text-muted uppercase tracking-wider mb-1">Before</div>
                      <pre className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 text-xs overflow-x-auto">
                        <code className="text-red-300 font-mono whitespace-pre">{comment.codeBefore}</code>
                      </pre>
                    </div>
                  )}
                  {comment.codeAfter && comment.codeAfter.trim() && (
                    <div>
                      <div className="text-[10px] font-semibold t-text-muted uppercase tracking-wider mb-1">After</div>
                      <pre className="bg-brand-500/5 border border-brand-500/20 rounded-lg p-3 text-xs overflow-x-auto">
                        <code className="text-brand-300 font-mono whitespace-pre">{comment.codeAfter}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ──────────────────────────────────────────────────

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

  const comments = review.reviewComments || []
  const summary = review.summary || { criticalIssues: 0, warnings: 0, suggestions: 0 }
  const keyChanges = review.keyChanges || []
  const issuesFound = review.issuesFound || []
  const fileOverviews = review.fileOverviews || []
  const flowchart = review.flowchart || null
  const confidenceScore = review.confidenceScore || 0
  const confidenceReason = review.confidenceReason || ''

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

      {/* In-progress / failed state */}
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

      {/* ═══ COMPLETED REVIEW SECTIONS ═══ */}
      {review.status === 'completed' && (
        <>
          {/* Overall Feedback */}
          {review.overallFeedback && (
            <div className="t-card p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-brand-400" />
                <h2 className="text-base font-semibold t-text">Summary</h2>
              </div>
              <p className="t-text-secondary leading-relaxed">{review.overallFeedback}</p>
            </div>
          )}

          {/* Key Changes + Issues Found */}
          {(keyChanges.length > 0 || issuesFound.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {keyChanges.length > 0 && (
                <div className="t-card p-5">
                  <h3 className="text-sm font-semibold t-text mb-3 flex items-center gap-2">
                    <CheckCircle size={14} className="text-brand-400" />
                    Key Changes
                  </h3>
                  <ul className="space-y-2">
                    {keyChanges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 t-text-secondary text-sm">
                        <span className="w-1 h-1 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {issuesFound.length > 0 && (
                <div className="t-card p-5">
                  <h3 className="text-sm font-semibold t-text mb-3 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-amber-400" />
                    Issues Found
                  </h3>
                  <ul className="space-y-2">
                    {issuesFound.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 t-text-secondary text-sm">
                        <span className="w-1 h-1 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Confidence + Score */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="md:col-span-2 t-card p-5">
              <p className="t-text-muted text-xs font-semibold uppercase tracking-wider mb-2">Confidence</p>
              {confidenceScore > 0 ? (
                <>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-brand-400">{confidenceScore}</span>
                    <span className="t-text-muted text-sm">/ 5</span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div
                        key={n}
                        className={`h-1.5 flex-1 rounded-full ${
                          n <= confidenceScore ? 'bg-brand-500' : 'bg-surface-700'
                        }`}
                      />
                    ))}
                  </div>
                  {confidenceReason && (
                    <p className="text-xs t-text-muted leading-relaxed">{confidenceReason}</p>
                  )}
                </>
              ) : (
                <p className="t-text-muted text-sm">N/A</p>
              )}
            </div>

            <div className="md:col-span-3 grid grid-cols-4 gap-3">
              <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
                <p className="t-text-muted text-[10px] font-semibold uppercase tracking-wider mb-2">P1</p>
                <p className="text-2xl font-bold text-red-400">{summary.criticalIssues || 0}</p>
              </div>
              <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
                <p className="t-text-muted text-[10px] font-semibold uppercase tracking-wider mb-2">P2</p>
                <p className="text-2xl font-bold text-amber-400">{summary.warnings || 0}</p>
              </div>
              <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
                <p className="t-text-muted text-[10px] font-semibold uppercase tracking-wider mb-2">P3</p>
                <p className="text-2xl font-bold text-cyan-400">{summary.suggestions || 0}</p>
              </div>
              <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
                <p className="t-text-muted text-[10px] font-semibold uppercase tracking-wider mb-2">Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(review.score)}`}>
                  {review.score}
                </p>
              </div>
            </div>
          </div>

          {/* Important Files Changed */}
          {fileOverviews.length > 0 && (
            <div className="t-card p-6 mb-6">
              <h2 className="text-base font-semibold t-text mb-4 flex items-center gap-2">
                <FileText size={16} className="text-brand-400" />
                Important Files Changed
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b t-border-subtle">
                      <th className="text-left t-text-muted text-xs font-semibold uppercase tracking-wider pb-3 pr-4">Filename</th>
                      <th className="text-left t-text-muted text-xs font-semibold uppercase tracking-wider pb-3">Overview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fileOverviews.map((f, i) => (
                      <tr key={i} className="border-b t-border-subtle last:border-b-0">
                        <td className="py-3 pr-4 align-top">
                          <code className="text-xs font-mono t-text-secondary bg-surface-800/50 px-2 py-1 rounded">
                            {f.filename}
                          </code>
                        </td>
                        <td className="py-3 t-text-secondary leading-relaxed align-top">
                          {f.overview}
                          {f.concerns && f.concerns.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {f.concerns.map((c, ci) => (
                                <li key={ci} className="text-xs text-amber-400 flex items-start gap-1.5">
                                  <AlertTriangle size={10} className="mt-0.5 flex-shrink-0" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Flowchart */}
          {flowchart && flowchart.trim() && (
            <div className="t-card p-6 mb-6">
              <h2 className="text-base font-semibold t-text mb-4 flex items-center gap-2">
                <GitBranch size={16} className="text-brand-400" />
                Flowchart
              </h2>
              <Mermaid chart={flowchart} />
            </div>
          )}

          {/* Review Comments */}
          {comments.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold t-text mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-brand-400" />
                Review Comments ({comments.length})
              </h2>
              <div className="space-y-4">
                {comments.map((comment, idx) => (
                  <ReviewCommentCard key={idx} comment={comment} />
                ))}
              </div>
            </div>
          )}

          {/* Verdict Footer */}
          <div className="t-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold t-text">Verdict</h3>
              <span className={review.verdict === 'approved' ? 'badge-success' : 'badge-danger'}>
                {review.verdict === 'approved' ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                {review.verdict === 'approved' ? 'Approved' : 'Changes Requested'}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
