import { useAppSelector } from '../../hooks/useAppDispatch'
import { useGetReposByUsernameQuery } from '../../store/githubApi'
import { formatNum, getLanguageColor } from '../../utils/format'
import {
  Bar, BarChart, Cell, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'

export default function StarsChart() {
  const username = useAppSelector((s) => s.search.username)
  const { data: repos, isLoading } = useGetReposByUsernameQuery(username)

  if (isLoading) return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 animate-pulse h-72" />
  )

  const data = [...(repos ?? [])]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 7)
    .map((r) => ({
      name: r.name,
      stars: r.stargazers_count,
      language: r.language ?? 'Other',
    }))

  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
        <span className="text-sm font-bold">Top Repos by Stars</span>
        <span className="text-xs font-mono bg-[#1c1c1c] border border-[#2a2a2a] px-3 py-1 rounded-full text-slate-400">
          top 7
        </span>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 24 }}>
            <XAxis
              type="number"
              tickFormatter={(v) => formatNum(v)}
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
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
              formatter={(value) => [formatNum(Number(value)) + ' stars', 'Stars']}
            />
            <Bar dataKey="stars" radius={[0, 4, 4, 0]} maxBarSize={20}>
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={getLanguageColor(entry.language)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}