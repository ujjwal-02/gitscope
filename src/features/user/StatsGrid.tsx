import { useAppSelector } from '../../hooks/useAppDispatch'
import { useGetReposByUsernameQuery } from '../../store/githubApi'
import { formatNum } from '../../utils/format'

interface StatCardProps {
  icon: string
  value: string
  label: string
  change: string
  changeUp: boolean
  accent: string
}

function StatCard({ icon, value, label, change, changeUp, accent }: StatCardProps) {
  return (
    <div className={`bg-[#111118] border border-[#2a2a3a] rounded-2xl p-5 relative overflow-hidden hover:-translate-y-1 transition-transform cursor-default`}>
      {/* bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${accent}`} />
      <div className="text-xl mb-3">{icon}</div>
      <div className="text-2xl font-extrabold font-mono">{value}</div>
      <div className="text-[11px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">{label}</div>
      <div className={`text-[11px] font-mono mt-2 ${changeUp ? 'text-emerald-300' : 'text-red-400'}`}>
        {changeUp ? '↑' : '↓'} {change}
      </div>
    </div>
  )
}

export default function StatsGrid() {
  const username = useAppSelector((state) => state.search.username)
  const { data: repos, isLoading } = useGetReposByUsernameQuery(username)

  if (isLoading) return (
    <div className="grid grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-5 h-32 animate-pulse" />
      ))}
    </div>
  )

  const totalStars = repos?.reduce((sum, r) => sum + r.stargazers_count, 0) ?? 0
  const totalForks = repos?.reduce((sum, r) => sum + r.forks_count, 0) ?? 0
  const totalIssues = repos?.reduce((sum, r) => sum + r.open_issues_count, 0) ?? 0
  const repoCount = repos?.length ?? 0

  const stats = [
    {
      icon: '★',
      value: formatNum(totalStars),
      label: 'Total Stars',
      change: '2.4% this month',
      changeUp: true,
      accent: 'bg-emerald-300',
    },
    {
      icon: '⑂',
      value: formatNum(totalForks),
      label: 'Total Forks',
      change: '1.1% this month',
      changeUp: true,
      accent: 'bg-indigo-400',
    },
    {
      icon: '◎',
      value: formatNum(totalIssues),
      label: 'Open Issues',
      change: '0.8% this week',
      changeUp: false,
      accent: 'bg-pink-400',
    },
    {
      icon: '◈',
      value: String(repoCount),
      label: 'Public Repos',
      change: 'all time',
      changeUp: true,
      accent: 'bg-amber-400',
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((s) => <StatCard key={s.label} {...s} />)}
    </div>
  )
}