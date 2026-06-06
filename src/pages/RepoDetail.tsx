import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetRepoDetailQuery,
  useGetRepoContributorsQuery,
} from '../store/githubApi'
import { formatNum, formatDate, getLanguageColor } from '../utils/format'

export default function RepoDetail() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const navigate = useNavigate()

  const { data: repoData, isLoading: repoLoading } =
    useGetRepoDetailQuery({ username: username!, repo: repo! })

  const { data: contributors, isLoading: contribLoading } =
    useGetRepoContributorsQuery({ username: username!, repo: repo! })

  if (repoLoading) return (
    <div className="flex min-h-screen bg-[#0a0a0f] items-center justify-center">
      <div className="text-slate-400 font-mono text-sm animate-pulse">Loading repo...</div>
    </div>
  )

  if (!repoData) return (
    <div className="flex min-h-screen bg-[#0a0a0f] items-center justify-center">
      <div className="text-red-400 font-mono text-sm">Repo not found.</div>
    </div>
  )

  const stats = [
    { label: 'Stars', value: formatNum(repoData.stargazers_count), icon: '★', color: 'text-amber-500' },
    { label: 'Forks', value: formatNum(repoData.forks_count), icon: '⑂', color: 'text-amber-400' },
    { label: 'Issues', value: formatNum(repoData.open_issues_count), icon: '◎', color: 'text-pink-400' },
    { label: 'Watchers', value: formatNum(repoData.stargazers_count), icon: '◉', color: 'text-amber-400' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200">

      {/* Top bar */}
      <div className="bg-[#141414] border-b border-[#2a2a2a] px-8 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-500 transition-colors font-semibold"
        >
          ← Back
        </button>
        <div className="h-4 w-px bg-[#2a2a2a]" />
        <span className="text-sm font-mono text-slate-500">{username}</span>
        <span className="text-slate-600">/</span>
        <span className="text-sm font-mono font-bold text-slate-200">{repo}</span>
        <a
          href={repoData.html_url}
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-xs bg-amber-500 text-black font-bold px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
        >
          View on GitHub ↗
        </a>
      </div>

      <div className="max-w-5xl mx-auto p-8 flex flex-col gap-6">

        {/* Repo header */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold">{repoData.name}</h1>
              {repoData.description && (
                <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-xl">
                  {repoData.description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                {repoData.language && (
                  <span
                    className="text-xs font-bold font-mono px-3 py-1 rounded-full"
                    style={{
                      background: getLanguageColor(repoData.language) + '22',
                      color: getLanguageColor(repoData.language),
                    }}
                  >
                    {repoData.language}
                  </span>
                )}
                {repoData.fork && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400/10 text-amber-400">
                    Forked
                  </span>
                )}
                {repoData.archived && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-500/10 text-slate-400">
                    Archived
                  </span>
                )}
                {repoData.topics?.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-xs font-mono text-slate-500 text-right flex-shrink-0">
              <div>Updated {formatDate(repoData.updated_at)}</div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5 text-center hover:-translate-y-1 transition-transform"
            >
              <div className={`text-2xl font-extrabold font-mono ${s.color}`}>
                {s.value}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-semibold">
                {s.icon} {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Contributors */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
            <span className="text-sm font-bold">Top Contributors</span>
            <span className="text-xs font-mono bg-[#1c1c1c] border border-[#2a2a2a] px-3 py-1 rounded-full text-slate-400">
              top 8
            </span>
          </div>

          {contribLoading ? (
            <div className="p-6 grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-20 bg-[#1c1c1c] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="p-6 grid grid-cols-4 gap-4">
              {(contributors ?? []).map((c) => (
                <a
                  key={c.login}
                  href={c.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#2a2a2a] hover:border-amber-500/30 hover:bg-[#1c1c1c] transition-all group"
                >
                  <img
                    src={c.avatar_url}
                    alt={c.login}
                    className="w-10 h-10 rounded-full ring-2 ring-transparent group-hover:ring-amber-500/30 transition-all"
                  />
                  <div className="text-xs font-semibold text-center truncate w-full">
                    {c.login}
                  </div>
                  <div className="text-xs font-mono text-amber-500">
                    {formatNum(c.contributions)} commits
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}