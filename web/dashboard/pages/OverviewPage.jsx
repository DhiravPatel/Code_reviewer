import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles, ArrowRight, ArrowUpRight, ArrowDownRight, Loader2, Shield, Bug, Zap,
  Wrench, Lightbulb, AlertTriangle, CheckCircle, Code2,
} from 'lucide-react'
import { api } from '../../shared/api/axios'
import { useAuth } from '../../shared/context/AuthContext'

const RANGE_OPTIONS = [
  { key: '7d',  label: '7d'   },
  { key: '30d', label: '30d'  },
  { key: '90d', label: '90d'  },
  { key: 'all', label: 'All'  },
]

const TYPE_ICONS = {
  security: Shield,
  bug: Bug,
  performance: Zap,
  maintainability: Wrench,
  style: Sparkles,
  suggestion: Lightbulb,
  warning: AlertTriangle,
}
const TYPE_COLORS = {
  security: '#dc2626',
  bug: '#b45309',
  performance: '#b45309',
  maintainability: '#0891b2',
  style: '#7c3aed',
  suggestion: '#10b981',
  warning: '#b45309',
}

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function scoreColor(s) {
  if (s == null) return '#56524a'
  if (s >= 80) return '#10b981'
  if (s >= 60) return '#b45309'
  return '#dc2626'
}

/* ─── Delta chip: italic green for positive, red for negative ─────── */

function Delta({ value, suffix = '', invert = false }) {
  if (value == null || value === 0) {
    return <span className="t-text-muted text-[11px]">—</span>
  }
  const positive = invert ? value < 0 : value > 0
  const Icon = value > 0 ? ArrowUpRight : ArrowDownRight
  const color = positive ? '#10b981' : '#dc2626'
  const sign = value > 0 ? '+' : ''
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-semibold tabular-nums"
      style={{ color }}
    >
      <Icon size={11} />
      {sign}{value}{suffix}
    </span>
  )
}

/* ─── Big stat tile with serif numeral + delta ───────────────────── */

function StatTile({ eyebrow, value, valueSuffix, delta, deltaSuffix, invertDelta, color }) {
  return (
    <div className="t-bg-card p-7" style={{ animation: 'rowFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
      <div className="eyebrow text-[9.5px] mb-3">{eyebrow}</div>
      <div className="flex items-baseline gap-1.5 mb-3">
        <span
          className="page-display tabular-nums leading-none"
          style={{ fontSize: 44, color: color || '#1a1612', letterSpacing: '-0.01em' }}
        >
          {value}
        </span>
        {valueSuffix && (
          <span className="t-text-muted" style={{ fontSize: 16 }}>{valueSuffix}</span>
        )}
      </div>
      <Delta value={delta} suffix={deltaSuffix} invert={invertDelta} />
    </div>
  )
}

/* ─── Activity bar chart: reviews per day ────────────────────────── */

function ActivityChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.reviews))
  const showLabels = data.length <= 14

  return (
    <div className="mt-4">
      <div className="flex items-end justify-between gap-[3px] h-44">
        {data.map((d, i) => {
          const h = max === 0 ? 0 : (d.reviews / max)
          return (
            <div key={i} className="group relative flex-1 flex flex-col justify-end h-full">
              <div
                className="w-full transition-all duration-500 ease-editorial bar-grow"
                style={{
                  height: '100%',
                  background: d.reviews > 0 ? '#1a1612' : 'transparent',
                  borderTop: d.reviews === 0 ? '1px dashed var(--border-subtle)' : 'none',
                  '--bar-h': h,
                  animationDelay: `${i * 25}ms`,
                  minHeight: d.reviews > 0 ? 4 : 0,
                }}
              />
              {/* Tooltip */}
              <div
                className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 t-bg-card border t-border-subtle px-3 py-2 whitespace-nowrap text-[10.5px] z-10"
                style={{ boxShadow: '0 8px 20px -8px rgba(0,0,0,0.18)' }}
              >
                <div className="font-mono t-text-secondary">{d.date}</div>
                <div className="page-display" style={{ fontSize: 18, color: '#10b981', lineHeight: 1 }}>
                  {d.reviews} {d.reviews === 1 ? 'review' : 'reviews'}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-3 text-[9.5px] t-text-faint font-mono">
        {showLabels ? (
          data.map((d, i) => <span key={i}>{d.date.slice(5)}</span>)
        ) : (
          <>
            <span>{data[0]?.date.slice(5)}</span>
            <span>{data[Math.floor(data.length / 2)]?.date.slice(5)}</span>
            <span>{data[data.length - 1]?.date.slice(5)}</span>
          </>
        )}
      </div>
    </div>
  )
}

/* ─── Type breakdown: horizontal bar list ────────────────────────── */

function TypeBreakdown({ types }) {
  if (!types || types.length === 0) {
    return <p className="t-text-muted text-[13px]">No issues found yet.</p>
  }
  const max = Math.max(...types.map((t) => t.count))
  return (
    <div className="space-y-4 mt-2">
      {types.slice(0, 6).map((t) => {
        const Icon = TYPE_ICONS[t.type] || Lightbulb
        const color = TYPE_COLORS[t.type] || '#56524a'
        const pct = (t.count / max) * 100
        return (
          <div key={t.type}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-2 text-[12px] t-text capitalize">
                <Icon size={12} style={{ color }} />
                {t.type}
              </span>
              <span className="page-display tabular-nums" style={{ fontSize: 18, color }}>
                {t.count}
              </span>
            </div>
            <div className="h-[2px] t-bg-input overflow-hidden">
              <div
                className="h-full bar-grow"
                style={{
                  background: color,
                  width: '100%',
                  '--bar-h': pct / 100,
                  transformOrigin: 'left',
                  animation: `barGrow 1s cubic-bezier(0.22, 1, 0.36, 1) both`,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────────────── */

export default function OverviewPage() {
  const navigate = useNavigate()
  const { user, githubConnected } = useAuth()
  const [range, setRange] = useState('30d')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    api
      .get(`/prs/stats?range=${range}`)
      .then((res) => {
        if (cancelled) return
        setStats(res.data?.data || null)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.response?.data?.message || 'Failed to load stats')
      })
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [range])

  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 animate-fade-in">
      {/* Editorial header */}
      <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="rule rule-grow" />
            <span className="eyebrow">Overview · {firstName}</span>
          </div>
          <h1 className="page-display t-text" style={{ fontSize: 56, lineHeight: 1.04 }}>
            How your reviews{' '}
            <span className="italic-accent">are trending.</span>
          </h1>
        </div>

        {/* Range selector */}
        <div className="flex items-center gap-0 t-bg-input border t-border-subtle p-1 rounded-none">
          {RANGE_OPTIONS.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`px-4 h-8 text-[10.5px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 ease-editorial ${
                range === r.key ? 't-bg-surface t-text' : 't-text-muted hover:t-text'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading / error states */}
      {loading && (
        <div className="t-bg-card border t-border-subtle p-16 text-center">
          <Loader2 size={24} className="animate-spin mx-auto mb-4" style={{ color: '#10b981' }} />
          <p className="t-text-muted text-[13px]">Loading your stats…</p>
        </div>
      )}

      {!loading && error && (
        <div className="border p-5" style={{ background: 'rgba(220,38,38,0.05)', borderColor: 'rgba(220,38,38,0.3)', color: '#dc2626' }}>
          {error}
        </div>
      )}

      {/* Not connected state */}
      {!loading && !error && stats && stats.summary.totalReviews === 0 && (
        <div className="t-bg-card border t-border-subtle p-12 text-center">
          <Sparkles size={28} className="mx-auto mb-5" style={{ color: '#10b981' }} />
          <h3 className="page-display t-text mb-3" style={{ fontSize: 28 }}>
            No reviews yet in this{' '}
            <span className="italic-accent">window.</span>
          </h3>
          <p className="t-text-muted text-[14px] mb-6 max-w-md mx-auto leading-[1.7]">
            {githubConnected
              ? 'Open or update a pull request on any enabled repo, or trigger one from the Pull Requests page.'
              : 'Connect GitHub and enable a repo to start collecting review data.'}
          </p>
          <button
            onClick={() => navigate(githubConnected ? '/dashboard/pull-requests' : '/dashboard/integrations')}
            className="press-scale inline-flex items-center gap-2 h-10 px-6 rounded-none text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ background: '#1a1612', color: '#fff', border: '1px solid #1a1612' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.borderColor = '#10b981' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#1a1612'; e.currentTarget.style.borderColor = '#1a1612' }}
          >
            {githubConnected ? 'View pull requests' : 'Connect GitHub'}
            <ArrowRight size={12} />
          </button>
        </div>
      )}

      {/* ═══ STATS ═══ */}
      {!loading && !error && stats && stats.summary.totalReviews > 0 && (
        <>
          {/* Top-line summary tiles */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-12"
            style={{ background: 'var(--border-subtle)' }}
          >
            <StatTile
              eyebrow="Reviews run"
              value={stats.summary.totalReviews}
              delta={stats.summary.deltas?.totalReviews}
            />
            <StatTile
              eyebrow="Average score"
              value={stats.summary.avgScore}
              valueSuffix="/100"
              delta={stats.summary.deltas?.avgScore}
              color={scoreColor(stats.summary.avgScore)}
            />
            <StatTile
              eyebrow="Critical issues (P1)"
              value={stats.summary.criticalIssues}
              delta={stats.summary.deltas?.criticalIssues}
              invertDelta
              color={stats.summary.criticalIssues > 0 ? '#dc2626' : '#10b981'}
            />
            <StatTile
              eyebrow="Approval rate"
              value={stats.summary.approvalRate}
              valueSuffix="%"
              delta={stats.summary.deltas?.approvalRate}
              deltaSuffix="%"
              color={stats.summary.approvalRate >= 80 ? '#10b981' : '#b45309'}
            />
          </div>

          {/* Activity chart */}
          <div className="t-bg-card border t-border-subtle p-8 mb-12" style={{ borderRadius: 0 }}>
            <div className="flex items-center gap-3 mb-1">
              <span className="rule" />
              <span className="eyebrow">Activity</span>
            </div>
            <h2 className="page-display t-text mb-2" style={{ fontSize: 28 }}>
              Reviews{' '}
              <span className="italic-accent">over time.</span>
            </h2>
            <ActivityChart data={stats.byDay} />
          </div>

          {/* Two-column: type breakdown + top repos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px mb-12" style={{ background: 'var(--border-subtle)' }}>
            <div className="t-bg-card p-8">
              <div className="flex items-center gap-3 mb-1">
                <span className="rule" style={{ background: '#b45309' }} />
                <span className="eyebrow">Issue types</span>
              </div>
              <h2 className="page-display t-text mb-5" style={{ fontSize: 24 }}>
                What we{' '}
                <span className="italic-accent">found.</span>
              </h2>
              <TypeBreakdown types={stats.typeBreakdown} />
            </div>

            <div className="t-bg-card p-8">
              <div className="flex items-center gap-3 mb-1">
                <span className="rule" />
                <span className="eyebrow">Most reviewed</span>
              </div>
              <h2 className="page-display t-text mb-5" style={{ fontSize: 24 }}>
                Active{' '}
                <span className="italic-accent">repositories.</span>
              </h2>
              {stats.topRepos.length === 0 ? (
                <p className="t-text-muted text-[13px]">No repositories with reviews yet.</p>
              ) : (
                <ul className="space-y-4">
                  {stats.topRepos.map((r, i) => (
                    <li key={r.repoId} className="flex items-baseline justify-between gap-3">
                      <div className="flex items-baseline gap-3 min-w-0">
                        <span
                          className="t-text-faint flex-shrink-0"
                          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontSize: 18 }}
                        >
                          0{i + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="page-display t-text truncate" style={{ fontSize: 18 }}>{r.name}</div>
                          <div className="t-text-muted text-[11px] font-mono mt-0.5 truncate">{r.fullName}</div>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-3 flex-shrink-0">
                        <span
                          className="page-display tabular-nums"
                          style={{ fontSize: 22, color: scoreColor(r.avgScore) }}
                        >
                          {r.avgScore}
                        </span>
                        <span className="eyebrow text-[9px]">{r.reviews}× run</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Recent reviews */}
          {stats.recentReviews.length > 0 && (
            <div className="mb-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="rule" />
                    <span className="eyebrow">Recent</span>
                  </div>
                  <h2 className="page-display t-text" style={{ fontSize: 28 }}>
                    Latest{' '}
                    <span className="italic-accent">reviews.</span>
                  </h2>
                </div>
                <button
                  onClick={() => navigate('/dashboard/pull-requests')}
                  className="press-scale inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] pb-1"
                  style={{ color: '#10b981', borderBottom: '1px solid #10b981' }}
                >
                  View all
                  <ArrowRight size={11} />
                </button>
              </div>

              <div className="t-bg-card border t-border-subtle" style={{ borderRadius: 0 }}>
                {stats.recentReviews.map((r, i) => (
                  <div
                    key={r.id}
                    onClick={() => navigate(`/dashboard/pr/${r.id}`)}
                    className="group flex items-center gap-6 px-6 py-5 border-b t-border-subtle last:border-b-0 cursor-pointer row-lift transition-all duration-500 ease-editorial"
                    style={{ animation: `rowFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 40}ms both` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-surface-hover)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '' }}
                  >
                    <span
                      className="page-display tabular-nums flex-shrink-0 w-12 text-center"
                      style={{ fontSize: 28, color: scoreColor(r.score), lineHeight: 1 }}
                    >
                      {r.score ?? '—'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="page-display t-text truncate" style={{ fontSize: 18, lineHeight: 1.2 }}>
                        {r.prTitle}
                      </h3>
                      <p className="text-[11.5px] t-text-muted mt-1 truncate">
                        <span className="font-mono t-text-secondary">{r.repoName}</span>
                        <span className="opacity-50 mx-2">·</span>
                        #{r.prNumber}
                        <span className="opacity-50 mx-2">·</span>
                        by {r.prAuthor}
                        <span className="opacity-50 mx-2">·</span>
                        {timeAgo(r.reviewedAt)}
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] flex-shrink-0"
                      style={{ color: r.verdict === 'approved' ? '#10b981' : '#dc2626' }}
                    >
                      {r.verdict === 'approved' ? <CheckCircle size={11} /> : <AlertTriangle size={11} />}
                      {r.verdict === 'approved' ? 'Approved' : 'Changes'}
                    </span>
                    <ArrowRight
                      size={14}
                      className="t-text-muted transition-transform duration-500 ease-editorial group-hover:translate-x-1 flex-shrink-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
