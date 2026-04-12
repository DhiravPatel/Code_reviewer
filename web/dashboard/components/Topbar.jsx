import { Bell, Moon, Sun, Menu } from 'lucide-react'
import { useTheme } from '../../shared/context/ThemeContext'
import { useAuth } from '../../shared/context/AuthContext'

function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function Topbar() {
  const { isDark, toggleTheme } = useTheme()
  const { user } = useAuth()

  const initials = getInitials(user?.name)
  const displayName = user?.name || 'User'

  return (
    <div id="dashboard-topbar" className="h-16 t-bg-surface backdrop-blur-xl border-b t-border flex items-center justify-between px-6 flex-shrink-0 transition-colors duration-300">
      {/* Left side — Mobile menu */}
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden t-text-secondary hover:t-text transition-colors">
          <Menu size={20} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl t-bg-input border t-border-subtle flex items-center justify-center t-text-secondary hover:t-text hover:bg-[var(--bg-surface-hover)] transition-all"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <button
          id="notifications-btn"
          className="relative w-9 h-9 rounded-xl t-bg-input border t-border-subtle flex items-center justify-center t-text-secondary hover:t-text hover:bg-[var(--bg-surface-hover)] transition-all"
        >
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-[9px] text-white font-bold">3</span>
          </span>
        </button>

        {/* Divider */}
        <div className="w-px h-8 t-bg-input mx-2 hidden sm:block border-l t-border-subtle" />

        {/* User avatar */}
        <button id="user-avatar" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={displayName}
              className="w-9 h-9 rounded-xl object-cover shadow-glow"
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-glow">
              {initials}
            </div>
          )}
          <div className="hidden sm:block text-left">
            <p className="t-text text-sm font-medium leading-tight">{displayName}</p>
            <p className="t-text-muted text-[11px]">Free Plan</p>
          </div>
        </button>
      </div>
    </div>
  )
}
