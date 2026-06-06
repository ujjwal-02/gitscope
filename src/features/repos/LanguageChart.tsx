import { useAppSelector } from '../../hooks/useAppDispatch'
import { useGetReposByUsernameQuery } from '../../store/githubApi'
import { getLanguageColor } from '../../utils/format'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

function buildLanguageData(repos: { language: string | null }[]) {
  const map: Record<string, number> = {}
  repos.forEach((r) => {
    if (r.language) map[r.language] = (map[r.language] ?? 0) + 1
  })
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)
}

export default function LanguageChart() {
  const username = useAppSelector((s) => s.search.username)
  const { data: repos, isLoading } = useGetReposByUsernameQuery(username)

  if (isLoading) return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 animate-pulse h-72" />
  )

  const data = buildLanguageData(repos ?? [])
  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
        <span className="text-sm font-bold">Language Breakdown</span>
        <span className="text-xs font-mono bg-[#1c1c1c] border border-[#2a2a2a] px-3 py-1 rounded-full text-slate-400">
          by repo count
        </span>
      </div>

      <div className="p-6 flex items-center gap-6">
        {/* Donut */}
        <div className="w-44 h-44 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={getLanguageColor(entry.name)}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#1c1c1c',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#e2e8f0',
                }}
                formatter={(value, name) => [
                 `${Number(value)} repos (${((Number(value) / total) * 100).toFixed(1)}%)`,
                    String(name),
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 flex-1">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: getLanguageColor(d.name) }}
              />
              <span className="text-sm font-semibold flex-1">{d.name}</span>
              <div className="flex-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(d.value / data[0].value) * 100}%`,
                    background: getLanguageColor(d.name),
                  }}
                />
              </div>
              <span className="text-xs font-mono text-slate-400 w-8 text-right">
                {((d.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}