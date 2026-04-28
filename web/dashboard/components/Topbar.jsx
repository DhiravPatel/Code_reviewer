import { Bell, Moon, Sun, Menu } from 'lucide-react'
import { useTheme } from '../../shared/context/ThemeContext'
import { useAuth } from '../../shared/context/AuthContext'

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function Topbar() {
  const { isDark, toggleTheme } = useTheme()
  const { user } = useAuth()

  const initials = getInitials(user?.name)
  const displayName = user?.name || 'User'

  return (
    <div className="h-14 t-bg border-b t-border-subtle flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
      {/* Mobile menu */}
      <button className="md:hidden w-8 h-8 rounded-md flex items-center justify-center t-text-secondary hover:t-text hover:t-bg-input transition-colors">
        <Menu size={16} />
      </button>

      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="w-8 h-8 rounded-md flex items-center justify-center t-text-secondary hover:t-text hover:t-bg-input transition-colors"
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Notifications */}
        <button
          title="Notifications"
          className="relative w-8 h-8 rounded-md flex items-center justify-center t-text-secondary hover:t-text hover:t-bg-input transition-colors"
        >
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 t-bg-input mx-2 hidden sm:block" />

        {/* User */}
        <div className="flex items-center gap-2.5 px-2">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt={displayName} className="w-7 h-7 rounded-full object-cover" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold">
              {initials}
            </div>
          )}
          <div className="hidden sm:block text-left">
            <p className="t-text text-[12.5px] font-medium leading-tight">{displayName}</p>
            <p className="t-text-muted text-[10.5px] leading-tight">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  )
}
