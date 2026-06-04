import {
  ArrowLeft, AlertTriangle, Lightbulb, Shield, FileText, GitBranch, Plus, Minus,
  CheckCircle, Clock, Loader2, Bug, Zap, Wrench, Sparkles, ChevronDown, ChevronRight,
  ShieldCheck, HelpCircle,
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

function AdversarialPill({ verdict }) {
  if (!verdict) return null
  const config = {
    confirmed: { Icon: ShieldCheck, label: 'Verified',   color: '#10b981', bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.35)' },
    refuted:   { Icon: AlertTriangle, label: 'Challenged', color: '#b45309', bg: 'rgba(180,83,9,0.10)',  border: 'rgba(180,83,9,0.35)' },
    uncertain: { Icon: HelpCircle, label: 'Uncertain',  color: '#64748b', bg: 'rgba(100,116,139,0.10)',border: 'rgba(100,116,139,0.35)' },
  }[verdict]
  if (!config) return null
  const { Icon, label, color, bg, border } = config
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.2em]"
      style={{ background: bg, color, border: `1px solid ${border}`, borderRadius: 999 }}
      title="Result of the adversarial skeptic pass"
    >
      <Icon size={9} strokeWidth={2.5} />
      {label}
    </span>
  )
}

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
  const hasCodeAfter = !!(comment.codeAfter && comment.codeAfter.trim())
  const hasCode = (comment.codeBefore && comment.codeBefore.trim()) || hasCodeAfter

  return (
    <div className="t-bg-card border t-border-subtle p-7 lg:p-8 card-hover-glow"
         style={{ borderRadius: 0 }}>
      <div className="flex gap-6">
        {/* Icon column with rule */}
        <div className="flex flex-col items-center flex-shrink-0 pt-1">
          <div
            className={`w-11 h-11 flex items-center justify-center ${pConf.bg} border ${pConf.border}`}
            style={{ borderRadius: 0 }}
          >
            <TypeIcon className={typeColor} size={20} />
          </div>
          <span className="w-px flex-1 mt-3" style={{ background: 'var(--border-subtle)', minHeight: 24 }} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Priority pill + type eyebrow + adversarial verdict + serif title */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] ${pConf.bg} ${pConf.color} border ${pConf.border}`}
              style={{ borderRadius: 999 }}
            >
              <span className={`w-1 h-1 rounded-full ${pConf.dot}`} />
              {pConf.label}
            </span>
            <span className="eyebrow text-[9.5px]">{comment.type || 'suggestion'}</span>
            <AdversarialPill verdict={comment.adversarial?.verdict} />
          </div>

          <h3
            className="page-display t-text mb-3"
            style={{ fontSize: 24, lineHeight: 1.1 }}
          >
            {comment.title}
          </h3>

          {comment.file && (
            <div className="mb-4">
              <span
                className="text-[11px] t-text-faint font-mono inline-block px-2.5 py-1"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 0 }}
              >
                {comment.file}{lineRef}
              </span>
            </div>
          )}
          <p className="t-text-secondary text-[14px] leading-[1.75] mb-4">{comment.description}</p>

          {/* Skeptic-pass note (collapsible-ish — always rendered, low-key) */}
          {comment.adversarial?.reasoning && (
            <div
              className="mb-4 px-4 py-3 flex gap-3"
              style={{
                background:
                  comment.adversarial.verdict === 'refuted' ? 'rgba(180, 83, 9, 0.06)' :
                  comment.adversarial.verdict === 'uncertain' ? 'rgba(100, 116, 139, 0.06)' :
                  'rgba(16, 185, 129, 0.05)',
                borderLeft: `2px solid ${
                  comment.adversarial.verdict === 'refuted' ? '#b45309' :
                  comment.adversarial.verdict === 'uncertain' ? '#64748b' :
                  '#10b981'
                }`,
              }}
            >
              {comment.adversarial.verdict === 'confirmed' && <ShieldCheck size={14} style={{ color: '#10b981', marginTop: 2, flexShrink: 0 }} />}
              {comment.adversarial.verdict === 'refuted' && <AlertTriangle size={14} style={{ color: '#b45309', marginTop: 2, flexShrink: 0 }} />}
              {comment.adversarial.verdict === 'uncertain' && <HelpCircle size={14} style={{ color: '#64748b', marginTop: 2, flexShrink: 0 }} />}
              <div className="flex-1">
                <div
                  className="eyebrow text-[9px] mb-1"
                  style={{
                    color:
                      comment.adversarial.verdict === 'refuted' ? '#b45309' :
                      comment.adversarial.verdict === 'uncertain' ? '#64748b' :
                      '#10b981',
                  }}
                >
                  Skeptic pass · {comment.adversarial.verdict}
                </div>
                <p className="text-[12.5px] leading-[1.65] t-text-secondary">{comment.adversarial.reasoning}</p>
              </div>
            </div>
          )}

          {rationale.length > 0 && (
            <ul className="space-y-2 mb-5">
              {rationale.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 t-text-secondary text-[13.5px] leading-[1.7]">
                  <span className={`w-1 h-1 rounded-full mt-2.5 flex-shrink-0 ${pConf.dot}`} />
                  {r}
                </li>
              ))}
            </ul>
          )}

          {hasCode && (
            <div className="mt-5 pt-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-4 transition-colors duration-500 ease-editorial"
                style={{ color: '#10b981' }}
              >
                {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                Suggested change
              </button>

              {expanded && (
                <div className="space-y-4">
                  {comment.codeBefore && comment.codeBefore.trim() && (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="rule" style={{ background: '#dc2626' }} />
                        <span className="eyebrow text-[9.5px]">Before</span>
                      </div>
                      <pre
                        className="p-4 text-[12px] overflow-x-auto"
                        style={{
                          background: 'rgba(220, 38, 38, 0.04)',
                          border: '1px solid rgba(220, 38, 38, 0.2)',
                          borderRadius: 0,
                        }}
                      >
                        <code className="font-mono whitespace-pre" style={{ color: '#dc2626' }}>{comment.codeBefore}</code>
                      </pre>
                    </div>
                  )}
                  {comment.codeAfter && comment.codeAfter.trim() && (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="rule" />
                        <span className="eyebrow text-[9.5px]">After</span>
                      </div>
                      <pre
                        className="p-4 text-[12px] overflow-x-auto"
                        style={{
                          background: 'rgba(16, 185, 129, 0.05)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          borderRadius: 0,
                        }}
                      >
                        <code className="font-mono whitespace-pre" style={{ color: '#047857' }}>{comment.codeAfter}</code>
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
    <div className="p-6 lg:p-10 max-w-6xl animate-fade-in">
      {/* Back Button — editorial text link */}
      <button
        onClick={() => navigate('/dashboard/pull-requests')}
        className="inline-flex items-center gap-2 mb-10 group press-scale text-[10.5px] font-semibold uppercase tracking-[0.22em] pb-1 relative"
        style={{ color: '#1a1612' }}
      >
        <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-500 ease-editorial" />
        Back to Pull Requests
      </button>

      {/* Editorial header — eyebrow → big serif title → meta */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="rule rule-grow" />
          <span className="eyebrow">Review · {timeAgo(review.reviewedAt)}</span>
        </div>

        <h1 className="page-display t-text" style={{ fontSize: 48, lineHeight: 1.04 }}>
          {review.prTitle}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[12.5px] t-text-muted">
          <span className="font-mono t-text-secondary">{review.repo?.fullName || ''}</span>
          <span className="opacity-50">·</span>
          <span>PR #{review.prNumber}</span>
          <span className="opacity-50">·</span>
          <span>by {review.prAuthor}</span>
          <span className="opacity-50">·</span>
          <span className="inline-flex items-center gap-1.5">
            <GitBranch size={11} />
            <span className="font-mono">{review.prBranch}</span>
          </span>
        </div>

        {/* Diff stats — editorial chips */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', color: '#047857' }}>
            <Plus size={11} />{review.additions}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5"
                style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.25)', color: '#dc2626' }}>
            <Minus size={11} />{review.deletions}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 t-bg-input t-text-secondary border t-border-subtle">
            <FileText size={11} />{review.filesChanged} files
          </span>
        </div>
      </div>

      {/* In-progress / failed state */}
      {review.status !== 'completed' && (
        <div className="t-bg-card border t-border-subtle p-12 text-center mb-8" style={{ borderRadius: 0 }}>
          {review.status === 'reviewing' ? (
            <>
              <Loader2 size={28} className="animate-spin mx-auto mb-5" style={{ color: '#10b981' }} />
              <h3 className="page-display t-text" style={{ fontSize: 28 }}>
                AI review <span className="italic-accent">in progress.</span>
              </h3>
              <p className="t-text-muted text-[14px] mt-3">This usually takes 15–30 seconds.</p>
            </>
          ) : review.status === 'failed' ? (
            <>
              <AlertTriangle size={28} className="text-red-400 mx-auto mb-5" />
              <h3 className="page-display t-text" style={{ fontSize: 28 }}>
                Review <span className="italic-accent" style={{ color: '#dc2626' }}>failed.</span>
              </h3>
              <p className="t-text-muted text-[14px] mt-3">The AI review encountered an error. Please try again.</p>
            </>
          ) : (
            <>
              <Clock size={28} className="t-text-secondary mx-auto mb-5" />
              <h3 className="page-display t-text" style={{ fontSize: 28 }}>
                Pending <span className="italic-accent">review.</span>
              </h3>
              <p className="t-text-muted text-[14px] mt-3">This PR hasn't been reviewed yet.</p>
            </>
          )}
        </div>
      )}

      {/* ═══ COMPLETED REVIEW SECTIONS ═══ */}
      {review.status === 'completed' && (
        <>
          {/* Project rules applied banner */}
          {summary?.projectRules?.ruleCount > 0 && (
            <div
              className="mb-10 p-5 flex items-center justify-between gap-6"
              style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.25)' }}
            >
              <div className="flex items-center gap-4">
                <span className="rule" />
                <div>
                  <div className="eyebrow" style={{ color: '#10b981' }}>Project rules applied</div>
                  <p
                    className="page-display t-text mt-1.5"
                    style={{ fontSize: 18 }}
                  >
                    <span className="italic-accent">{summary.projectRules.ruleCount}</span> rule{summary.projectRules.ruleCount === 1 ? '' : 's'} from{' '}
                    <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontStyle: 'normal', fontWeight: 500 }}>
                      {summary.projectRules.sourceFile}
                    </code>
                    {summary.projectRules.focus?.length > 0 && (
                      <span className="t-text-muted" style={{ fontSize: 14 }}>
                        {' · focus on '}
                        <span style={{ color: '#10b981' }}>{summary.projectRules.focus.join(', ')}</span>
                      </span>
                    )}
                  </p>
                  {summary.projectRules.ignoredFiles?.length > 0 && (
                    <p className="t-text-muted text-[12px] mt-1.5">
                      Skipped {summary.projectRules.ignoredFiles.length} file{summary.projectRules.ignoredFiles.length === 1 ? '' : 's'} matching ignore patterns.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Adversarial pass banner */}
          {summary?.adversarial?.total > 0 && (
            <div
              className="mb-10 p-5 flex items-center justify-between gap-6 flex-wrap"
              style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.22)' }}
            >
              <div className="flex items-center gap-4">
                <ShieldCheck size={24} style={{ color: '#10b981' }} />
                <div>
                  <div className="eyebrow" style={{ color: '#10b981' }}>Adversarial skeptic pass</div>
                  <p className="page-display t-text mt-1.5" style={{ fontSize: 22, lineHeight: 1.2 }}>
                    <span className="italic-accent">{summary.adversarial.verified}</span> of {summary.adversarial.total}{' '}
                    finding{summary.adversarial.total === 1 ? '' : 's'} verified after a second AI agent challenged each claim.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.2em] flex-shrink-0">
                <span className="inline-flex items-center gap-1.5" style={{ color: '#10b981' }}>
                  <ShieldCheck size={11} strokeWidth={2.5} /> {summary.adversarial.verified} verified
                </span>
                <span className="inline-flex items-center gap-1.5" style={{ color: '#b45309' }}>
                  <AlertTriangle size={11} strokeWidth={2.5} /> {summary.adversarial.challenged} challenged
                </span>
                <span className="inline-flex items-center gap-1.5" style={{ color: '#64748b' }}>
                  <HelpCircle size={11} strokeWidth={2.5} /> {summary.adversarial.uncertain} uncertain
                </span>
              </div>
            </div>
          )}

          {/* Overall Feedback — editorial pull quote */}
          {review.overallFeedback && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Summary</span>
              </div>
              <p
                className="t-text leading-[1.5] max-w-3xl"
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 400,
                  fontSize: 26,
                  fontStyle: 'italic',
                }}
              >
                <span style={{ color: '#10b981' }}>“</span>
                {review.overallFeedback}
                <span style={{ color: '#10b981' }}>”</span>
              </p>
            </div>
          )}

          {/* Stats strip — flat editorial cells */}
          <div className="mb-12 grid grid-cols-2 md:grid-cols-5 gap-px" style={{ background: 'var(--border-subtle)' }}>
            <div className="t-bg-card p-6 md:col-span-1">
              <div className="eyebrow text-[9.5px] mb-3">Confidence</div>
              {confidenceScore > 0 ? (
                <>
                  <div className="page-display tabular-nums" style={{ fontSize: 40, lineHeight: 1, color: '#10b981' }}>
                    {confidenceScore}
                    <span className="t-text-muted" style={{ fontSize: 18 }}> / 5</span>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div
                        key={n}
                        className="h-[2px] flex-1"
                        style={{ background: n <= confidenceScore ? '#10b981' : 'var(--bg-input)' }}
                      />
                    ))}
                  </div>
                  {confidenceReason && (
                    <p className="text-[11.5px] t-text-muted leading-[1.6] mt-3">{confidenceReason}</p>
                  )}
                </>
              ) : (
                <p className="page-display t-text-muted" style={{ fontSize: 32 }}>N/A</p>
              )}
            </div>
            <div className="t-bg-card p-6">
              <div className="eyebrow text-[9.5px] mb-3">P1 · Critical</div>
              <div className="page-display tabular-nums" style={{ fontSize: 40, lineHeight: 1, color: '#dc2626' }}>
                {summary.criticalIssues || 0}
              </div>
            </div>
            <div className="t-bg-card p-6">
              <div className="eyebrow text-[9.5px] mb-3">P2 · Warning</div>
              <div className="page-display tabular-nums" style={{ fontSize: 40, lineHeight: 1, color: '#b45309' }}>
                {summary.warnings || 0}
              </div>
            </div>
            <div className="t-bg-card p-6">
              <div className="eyebrow text-[9.5px] mb-3">P3 · Suggestion</div>
              <div className="page-display tabular-nums" style={{ fontSize: 40, lineHeight: 1, color: '#0891b2' }}>
                {summary.suggestions || 0}
              </div>
            </div>
            <div className="t-bg-card p-6">
              <div className="eyebrow text-[9.5px] mb-3">Score</div>
              <div
                className="page-display tabular-nums"
                style={{
                  fontSize: 40,
                  lineHeight: 1,
                  color: review.score >= 80 ? '#10b981' : review.score >= 60 ? '#b45309' : '#dc2626',
                }}
              >
                {review.score}
                <span className="t-text-muted" style={{ fontSize: 18 }}> / 100</span>
              </div>
            </div>
          </div>

          {/* Key Changes + Issues Found */}
          {(keyChanges.length > 0 || issuesFound.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-12" style={{ background: 'var(--border-subtle)' }}>
              {keyChanges.length > 0 && (
                <div className="t-bg-card p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="rule" />
                    <span className="eyebrow">Key changes</span>
                  </div>
                  <ul className="space-y-3">
                    {keyChanges.map((c, i) => (
                      <li key={i} className="flex items-start gap-3 t-text-secondary text-[14px] leading-[1.65]">
                        <span className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0" style={{ background: '#10b981' }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {issuesFound.length > 0 && (
                <div className="t-bg-card p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="rule" style={{ background: '#b45309' }} />
                    <span className="eyebrow">Issues found</span>
                  </div>
                  <ul className="space-y-3">
                    {issuesFound.map((c, i) => (
                      <li key={i} className="flex items-start gap-3 t-text-secondary text-[14px] leading-[1.65]">
                        <span className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0" style={{ background: '#b45309' }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Important Files Changed */}
          {fileOverviews.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="rule" />
                <span className="eyebrow">Important files changed</span>
              </div>
              <div className="t-bg-card border t-border-subtle overflow-x-auto" style={{ borderRadius: 0 }}>
                <table className="w-full text-[14px]">
                  <tbody>
                    {fileOverviews.map((f, i) => (
                      <tr key={i} className="border-b t-border-subtle last:border-b-0">
                        <td className="py-5 px-6 pr-4 align-top w-[280px]">
                          <code
                            className="text-[11.5px] font-mono t-text-secondary inline-block px-2 py-1"
                            style={{ background: 'var(--bg-input)', borderRadius: 0 }}
                          >
                            {f.filename}
                          </code>
                        </td>
                        <td className="py-5 px-6 pl-0 t-text-secondary leading-[1.7] align-top">
                          {f.overview}
                          {f.concerns && f.concerns.length > 0 && (
                            <ul className="mt-3 space-y-1.5">
                              {f.concerns.map((c, ci) => (
                                <li key={ci} className="text-[12.5px] flex items-start gap-2" style={{ color: '#b45309' }}>
                                  <AlertTriangle size={11} className="mt-0.5 flex-shrink-0" />
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
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="rule" />
                <span className="eyebrow">Flow</span>
              </div>
              <div className="t-bg-card border t-border-subtle p-6" style={{ borderRadius: 0 }}>
                <Mermaid chart={flowchart} />
              </div>
            </div>
          )}

          {/* Review Comments */}
          {comments.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="rule" />
                <span className="eyebrow">Review comments</span>
              </div>
              <h2 className="page-display t-text mb-8" style={{ fontSize: 40, lineHeight: 1.04 }}>
                {comments.length} {comments.length === 1 ? 'observation' : 'observations'}{' '}
                <span className="italic-accent">worth reading.</span>
              </h2>
              <div className="space-y-px" style={{ background: 'var(--border-subtle)' }}>
                {comments.map((comment, idx) => (
                  <ReviewCommentCard key={idx} comment={comment} />
                ))}
              </div>
            </div>
          )}

          {/* Verdict Footer */}
          <div
            className="mt-16 pt-10 flex items-center justify-between"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="rule" />
                <span className="eyebrow">Verdict</span>
              </div>
              <h3 className="page-display t-text" style={{ fontSize: 36 }}>
                {review.verdict === 'approved' ? (
                  <>Looks <span className="italic-accent">good to ship.</span></>
                ) : (
                  <>Changes <span className="italic-accent" style={{ color: '#dc2626' }}>requested.</span></>
                )}
              </h3>
            </div>
            <span
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] flex-shrink-0"
              style={{
                background: review.verdict === 'approved' ? 'rgba(16,185,129,0.08)' : 'rgba(220,38,38,0.06)',
                border: `1px solid ${review.verdict === 'approved' ? 'rgba(16,185,129,0.35)' : 'rgba(220,38,38,0.3)'}`,
                color: review.verdict === 'approved' ? '#10b981' : '#dc2626',
              }}
            >
              {review.verdict === 'approved' ? <CheckCircle size={13} /> : <AlertTriangle size={13} />}
              {review.verdict === 'approved' ? 'Approved' : 'Changes Requested'}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
