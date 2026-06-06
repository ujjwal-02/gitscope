import { useAppSelector, useAppDispatch } from '../../hooks/useAppDispatch'
import { useGetReposByUsernameQuery } from '../../store/githubApi'
import { setFilters } from '../../store/searchSlice'
import { formatNum, formatDate, getLanguageColor } from '../../utils/format'
import type { GitHubRepo } from '../../types/github'
import { useNavigate } from 'react-router-dom'

const FILTER_TYPES = ['all', 'source', 'fork', 'archived'] as const

const SORT_OPTIONS = [
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Updated' },
  { value: 'name', label: 'Name' },
]

function filterRepos(repos: GitHubRepo[], type: string): GitHubRepo[] {
  if (type === 'all') return repos
  if (type === 'fork') return repos.filter((r) => r.fork)
  if (type === 'archived') return repos.filter((r) => r.archived)
  return repos.filter((r) => !r.fork && !r.archived)
}

function sortRepos(repos: GitHubRepo[], sort: string): GitHubRepo[] {
  return [...repos].sort((a, b) => {
    if (sort === 'stars') return b.stargazers_count - a.stargazers_count
    if (sort === 'forks') return b.forks_count - a.forks_count
    if (sort === 'updated')
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    if (sort === 'name') return a.name.localeCompare(b.name)
    return 0
  })
}

export default function RepoList() {
  const dispatch = useAppDispatch()
  const username = useAppSelector((s) => s.search.username)
  const filters = useAppSelector((s) => s.search.filters)
  const { data: repos, isLoading } = useGetReposByUsernameQuery(username)
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-6 animate-pulse h-64" />
    )
  }

  const filtered = sortRepos(filterRepos(repos ?? [], filters.type), filters.sort)

  return (
    <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl overflow-hidden">

      {/* Card Header */}
      <div className="px-6 py-4 border-b border-[#2a2a3a] flex items-center justify-between">
        <span className="text-sm font-bold">Repositories</span>
        <span className="text-xs font-mono bg-[#1a1a26] border border-[#2a2a3a] px-3 py-1 rounded-full text-slate-400">
          {filtered.length} repos
        </span>
      </div>

      {/* Filters row */}
      <div className="px-6 py-3 border-b border-[#2a2a3a] flex items-center gap-2">
        {FILTER_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => dispatch(setFilters({ type }))}
            className={`text-xs font-bold px-4 py-1.5 rounded-full border transition-all capitalize
              ${filters.type === type
                ? 'bg-emerald-300 text-black border-emerald-300'
                : 'border-[#2a2a3a] text-slate-500 hover:text-slate-200 hover:border-slate-500'
              }`}
          >
            {type}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-500">Sort:</span>
          <select
            value={filters.sort}
            onChange={(e) =>
              dispatch(setFilters({ sort: e.target.value as typeof filters.sort }))
            }
            className="bg-[#1a1a26] border border-[#2a2a3a] text-slate-300 text-xs rounded-lg px-3 py-1.5 outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table column headers */}
      <div className="grid grid-cols-[2fr_80px_80px_80px_110px_100px] gap-3 px-6 py-2.5 border-b border-[#2a2a3a]">
        {['Repository', 'Stars', 'Forks', 'Issues', 'Language', 'Updated'].map((h) => (
          <div key={h} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {h}
          </div>
        ))}
      </div>

      {/* Repo rows */}
      {filtered.length === 0 ? (
        <div className="px-6 py-12 text-center text-slate-500 text-sm">
          No repositories found for this filter.
        </div>
      ) : (
        filtered.map((repo) => (
          <div
            key={repo.id}
            onClick={() => navigate(`/repo/${username}/${repo.name}`)}
            className="grid grid-cols-[2fr_80px_80px_80px_110px_100px] gap-3 px-6 py-3.5 border-b border-[#2a2a3a] hover:bg-[#1a1a26] transition-colors items-center group cursor-pointer"
          >
            <div>
              <div className="text-sm font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                {repo.name}
              </div>
              {repo.description && (
                <div className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">
                  {repo.description}
                </div>
              )}
            </div>

            <div className="text-sm font-mono">⭐ {formatNum(repo.stargazers_count)}</div>
            <div className="text-sm font-mono">⑂ {formatNum(repo.forks_count)}</div>
            <div className="text-sm font-mono">{repo.open_issues_count}</div>

            <div>
              {repo.language ? (
                <span
                  className="text-xs font-bold font-mono px-2.5 py-1 rounded-full"
                  style={{
                    background: getLanguageColor(repo.language) + '22',
                    color: getLanguageColor(repo.language),
                  }}
                >
                  {repo.language}
                </span>
              ) : (
                <span className="text-xs text-slate-600">—</span>
              )}
            </div>

            <div className="text-xs text-slate-500 font-mono">
              {formatDate(repo.updated_at)}
            </div>
          </div>
        ))
      )}
    </div>
  )
}