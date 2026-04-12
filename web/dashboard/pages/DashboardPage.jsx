import { Activity, Bug, Lightbulb, GitBranch, ArrowUpRight } from 'lucide-react'
import StatsCard from '../components/StatsCard'
import PRTable from '../components/PRTable'
import { mockPullRequests } from '../../shared/data'
import { useAuth } from '../../shared/context/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()
  const recentPRs = mockPullRequests.slice(0, 4)
  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="p-6 lg:p-8 max-w-7xl animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl lg:text-3xl font-bold t-text tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="badge-success">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
        <p className="t-text-muted">Welcome back, {firstName}! Here's your code review summary.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatsCard icon={GitBranch} title="Total PRs Reviewed" value="1,234" trend={12} color="brand" />
        <StatsCard icon={Bug} title="Issues Found" value="3,429" trend={8} color="red" />
        <StatsCard icon={Lightbulb} title="Suggestions Made" value="2,892" trend={-3} color="amber" />
        <StatsCard icon={Activity} title="Avg Review Time" value="28s" trend={-15} trendLabel="faster than avg" color="cyan" />
      </div>

      {/* Activity chart placeholder + Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity chart */}
        <div className="lg:col-span-2 t-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold t-text">Review Activity</h2>
            <select className="text-xs t-bg-input border t-border-subtle rounded-lg px-3 py-1.5 t-text-secondary focus:outline-none focus:border-brand-500/50">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          {/* Sparkline bars */}
          <div className="flex items-end gap-2 h-40 mt-4">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50, 88, 72].map((h, i) => (
              <div key={i} className="flex-1 group relative h-full flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-brand-500/40 to-brand-500/80 rounded-t-md hover:from-brand-500/60 hover:to-brand-400 transition-all duration-200 cursor-pointer"
                  style={{ height: `${h}%` }}
                />
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 t-bg-card border t-border-subtle t-text text-[10px] px-2 py-1 rounded-lg whitespace-nowrap transition-opacity shadow-lg z-10 pointer-events-none">
                  {Math.round(h * 1.5)} PRs
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-[10px] t-text-faint">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="t-card p-6">
          <h2 className="text-lg font-semibold t-text mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Review Pending PRs', count: 4, href: '/dashboard/pull-requests' },
              { label: 'Sync Repositories', count: 2, href: '/dashboard/repositories' },
              { label: 'View Security Alerts', count: 7, href: '/dashboard/pull-requests' },
            ].map((action, idx) => (
              <a
                key={idx}
                href={action.href}
                className="flex items-center justify-between p-3 rounded-xl t-bg-surface border t-border-subtle hover:border-brand-500/30 hover:bg-surface-700/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm t-text-secondary group-hover:t-text transition-colors">{action.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-brand-500/15 text-brand-400 px-2 py-0.5 rounded-full font-medium">{action.count}</span>
                  <ArrowUpRight size={14} className="t-text-muted group-hover:text-brand-400 transition-colors" />
                </div>
              </a>
            ))}
          </div>

          {/* Score ring */}
          <div className="mt-6 p-4 rounded-xl t-bg-surface border t-border-subtle text-center">
            <p className="t-text-muted text-xs font-medium uppercase tracking-wider mb-3">Code Health Score</p>
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="34" stroke="currentColor" className="text-surface-200 dark:text-surface-800" strokeWidth="6" fill="none" />
                <circle
                  cx="40" cy="40" r="34"
                  stroke="url(#scoreGradient)" strokeWidth="6" fill="none"
                  strokeDasharray={`${2 * Math.PI * 34 * 0.87} ${2 * Math.PI * 34}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute text-xl font-bold t-text">87</span>
            </div>
            <p className="text-brand-400 text-xs font-medium mt-2">Excellent</p>
          </div>
        </div>
      </div>

      {/* Recent PRs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold t-text">Recent Pull Requests</h2>
          <a href="/dashboard/pull-requests" className="text-brand-400 text-sm hover:text-brand-300 transition-colors font-medium">
            View All →
          </a>
        </div>
        <PRTable prs={recentPRs} />
      </div>
    </div>
  )
}
