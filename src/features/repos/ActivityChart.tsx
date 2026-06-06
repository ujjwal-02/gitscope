import { useAppSelector } from '../../hooks/useAppDispatch'
import { useGetReposByUsernameQuery } from '../../store/githubApi'
import { formatNum } from '../../utils/format'
import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, Legend,
} from 'recharts'

export default function ActivityChart() {
  const username = useAppSelector((s) => s.search.username)
  const { data: repos, isLoading } = useGetReposByUsernameQuery(username)

  if (isLoading) return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 animate-pulse h-72" />
  )

  const data = [...(repos ?? [])]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 8)
    .map((r) => ({
      name: r.name.length > 12 ? r.name.slice(0, 12) + '…' : r.name,
      Stars: r.stargazers_count,
      Forks: r.forks_count,
    }))

  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
        <span className="text-sm font-bold">Stars vs Forks</span>
        <span className="text-xs font-mono bg-[#1c1c1c] border border-[#2a2a2a] px-3 py-1 rounded-full text-slate-400">
          top 8 repos
        </span>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ left: 0, right: 8 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: '#64748b', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => formatNum(v)}
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              contentStyle={{
                background: '#1c1c1c',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#e2e8f0',
              }}
              formatter={(value) => formatNum(Number(value))}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#94a3b8', paddingTop: '12px' }}
            />
            <Bar dataKey="Stars" fill="#6ee7b7" radius={[4, 4, 0, 0]} maxBarSize={24} />
            <Bar dataKey="Forks" fill="#818cf8" radius={[4, 4, 0, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}