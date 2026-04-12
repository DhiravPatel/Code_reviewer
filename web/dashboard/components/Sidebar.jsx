import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, GitBranch, Code2, Settings, LogOut, ChevronLeft, ChevronRight, Blocks } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../shared/context/AuthContext'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Code2, label: 'Repositories', path: '/dashboard/repositories' },
  { icon: GitBranch, label: 'Pull Requests', path: '/dashboard/pull-requests' },
  { icon: Blocks, label: 'Integrations', path: '/dashboard/integrations' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
]

function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
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
      id="dashboard-sidebar"
      className={`${
        collapsed ? 'w-[72px]' : 'w-64'
      } t-bg-surface backdrop-blur-xl border-r t-border p-3 flex flex-col transition-all duration-300 relative hidden md:flex`}
    >
      {/* Collapse toggle */}
      <button
        id="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 t-bg-input border t-border-subtle rounded-full flex items-center justify-center t-text-secondary hover:t-text hover:bg-[var(--bg-surface-hover)] transition-all z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Logo */}
      <div className={`flex items-center gap-3 mb-6 pb-6 border-b t-border-subtle ${collapsed ? 'justify-center' : 'px-2'}`}>
        <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-glow">
          <span className="text-white font-bold text-sm">CR</span>
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="t-text font-bold text-sm leading-tight">CodeReview</h1>
            <p className="text-[10px] t-text-muted font-medium">Dashboard</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20 shadow-sm'
                  : 't-text-secondary hover:t-text hover:bg-[var(--bg-surface-hover)]'
              }`}
            >
              <Icon size={20} className={`flex-shrink-0 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
              {!collapsed && (
                <span className="text-sm font-medium animate-fade-in">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="pt-4 border-t t-border-subtle">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 mb-3 animate-fade-in">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={displayName}
                className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <p className="t-text text-sm font-medium truncate">{displayName}</p>
              <p className="t-text-muted text-[11px] truncate">{displayEmail}</p>
            </div>
          </div>
        )}

        <button
          id="sidebar-logout-btn"
          onClick={() => signOut()}
          title={collapsed ? 'Logout' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl t-bg-input t-text-secondary hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
