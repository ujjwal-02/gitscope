import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import UserProfile from './features/user/UserProfile'
import StatsGrid from './features/user/StatsGrid'
import RepoList from './features/repos/RepoList'
import LanguageChart from './features/repos/LanguageChart'
import StarsChart from './features/repos/StarsChart'
import ActivityChart from './features/repos/ActivityChart'
import RepoDetail from './pages/RepoDetail'
import NotFound from './pages/NotFound'
import Landing from './pages/Landing'

function Dashboard() {
  const [searched, setSearched] = useState(false)

  if (!searched) return <Landing onSearch={() => setSearched(true)} />

  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-8 flex flex-col gap-6">
          <UserProfile />
          <StatsGrid />
          <div className="grid grid-cols-2 gap-6">
            <StarsChart />
            <LanguageChart />
          </div>
          <ActivityChart />
          <RepoList />
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/repo/:username/:repo" element={<RepoDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}