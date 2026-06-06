import { useAppSelector } from '../../hooks/useAppDispatch'
import { useGetUserByUsernameQuery } from '../../store/githubApi'
import { formatNum } from '../../utils/format'

export default function UserProfile() {
  const username = useAppSelector((state) => state.search.username)
  const { data, isLoading, isError } = useGetUserByUsernameQuery(username)

  if (isLoading) return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 animate-pulse h-28" />
  )

  if (isError) return (
    <div className="bg-[#141414] border border-red-500/30 rounded-2xl p-6 text-red-400 text-sm">
      User not found. Check the username and try again.
    </div>
  )

  if (!data) return null

  const stats = [
    { label: 'Repos', value: formatNum(data.public_repos) },
    { label: 'Followers', value: formatNum(data.followers) },
    { label: 'Following', value: formatNum(data.following) },
  ]

  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 flex items-center gap-6">
      <img
        src={data.avatar_url}
        alt={data.name}
        className="w-16 h-16 rounded-full ring-2 ring-amber-500/30"
      />
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-extrabold text-slate-100">{data.name}</h2>
        <p className="text-sm text-slate-500 font-mono mt-0.5">@{data.login}</p>
        {data.bio && (
          <p className="text-sm text-slate-400 mt-1 truncate">{data.bio}</p>
        )}
      </div>
      <div className="flex gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-xl font-extrabold text-amber-500 font-mono">{s.value}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}