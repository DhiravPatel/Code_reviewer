import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import RepositoriesPage from './pages/RepositoriesPage'
import PullRequestsPage from './pages/PullRequestsPage'
import PRDetailPage from './pages/PRDetailPage'
import IntegrationsPage from './pages/IntegrationsPage'

export default function DashboardApp() {
  return (
    <div className="flex h-screen t-bg t-text transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/dashboard/integrations" element={<IntegrationsPage />} />
            <Route path="/dashboard/repositories" element={<RepositoriesPage />} />
            <Route path="/dashboard/pull-requests" element={<PullRequestsPage />} />
            <Route path="/dashboard/pr/:id" element={<PRDetailPage />} />
            {/* /dashboard and any unknown /dashboard/* → integrations */}
            <Route path="/dashboard" element={<Navigate to="/dashboard/integrations" replace />} />
            <Route path="/dashboard/*" element={<Navigate to="/dashboard/integrations" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
