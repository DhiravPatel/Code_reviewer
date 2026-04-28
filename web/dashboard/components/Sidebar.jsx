import { Link, useLocation } from 'react-router-dom'
import { GitPullRequest, Code2, LogOut, ChevronLeft, ChevronRight, Blocks } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../shared/context/AuthContext'

const menuItems = [
  { icon: Code2, label: 'Repositories', path: '/dashboard/repositories' },
  { icon: GitPullRequest, label: 'Pull Requests', path: '/dashboard/pull-requests' },
  { icon: Blocks, label: 'Integrations', path: '/dashboard/integrations' },
]

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function Sidebar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const { user, signOut } = useAuth()

  const initials = getInitials(user?.name)
  const displayName = user?.name || 'User'
  const displayEmail = user?.email || ''

  return (
    <aside
      className={`${collapsed ? 'w-16' : 'w-60'} t-bg-secondary border-r t-border-subtle flex flex-col transition-all duration-200 relative hidden md:flex`}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-7 w-6 h-6 t-bg-card border t-border-subtle rounded-full flex items-center justify-center t-text-muted hover:t-text transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
      </button>

      {/* Logo */}
      <div className={`flex items-center gap-2.5 px-4 h-14 border-b t-border-subtle ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="w-7 h-7 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-md flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-[11px]">CR</span>
        </div>
        {!collapsed && (
          <div className="min-w-0 leading-tight">
            <h1 className="t-text font-semibold text-[13px] tracking-tight">CodeReview</h1>
            <p className="text-[10px] t-text-muted">AI-powered reviews</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={`flex-1 overflow-y-auto py-3 ${collapsed ? 'px-2' : 'px-2.5'} space-y-0.5`}>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-2.5 ${collapsed ? 'justify-center px-2' : 'px-2.5'} h-9 rounded-md text-[13px] font-medium transition-colors ${
                isActive
                  ? 'bg-brand-500/10 text-brand-400'
                  : 't-text-secondary hover:t-text hover:bg-[var(--bg-surface-hover)]'
              }`}
            >
              <Icon size={16} className="flex-shrink-0" strokeWidth={1.8} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className={`border-t t-border-subtle ${collapsed ? 'p-2' : 'p-2.5'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-[var(--bg-surface-hover)] transition-colors mb-1">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={displayName} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="t-text text-[12.5px] font-medium truncate">{displayName}</p>
              <p className="t-text-muted text-[10.5px] truncate">{displayEmail}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => signOut()}
          title={collapsed ? 'Sign out' : undefined}
          className={`w-full flex items-center gap-2.5 ${collapsed ? 'justify-center px-2' : 'px-2.5'} h-9 rounded-md text-[13px] font-medium t-text-secondary hover:t-text hover:bg-red-500/10 hover:text-red-400 transition-colors`}
        >
          <LogOut size={15} strokeWidth={1.8} />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  )
}
