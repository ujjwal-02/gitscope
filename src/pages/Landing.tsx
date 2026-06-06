import { useState } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { setUsername, resetFilters } from '../store/searchSlice'

const SUGGESTIONS = ['torvalds', 'facebook', 'vercel', 'microsoft', 'google']

const FEATURES = [
  { icon: '◈', title: 'Repo Analytics', desc: 'Stars, forks, issues across all repos in one view' },
  { icon: '▦', title: 'Language Breakdown', desc: 'Visual breakdown of languages used across repos' },
  { icon: '⑂', title: 'Contributor Insights', desc: 'Top contributors with commit counts per repo' },
  { icon: '⌘', title: 'Instant Caching', desc: 'Repeat searches load instantly — no extra API calls' },
]

interface LandingProps {
  onSearch: () => void
}

export default function Landing({ onSearch }: LandingProps) {
  const dispatch = useAppDispatch()
  const [input, setInput] = useState('')

  function handleSearch(val?: string) {
    const trimmed = (val ?? input).trim().toLowerCase()
    if (!trimmed) return
    dispatch(setUsername(trimmed))
    dispatch(resetFilters())
    onSearch()
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f8fafc] flex">

      {/* Left — Description */}
      <div className="flex-1 flex flex-col justify-center px-16 py-16 border-r border-[#2a2a2a]">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-black font-bold text-sm">
            ⬡
          </div>
          <span className="font-mono font-bold text-lg">
            Git<span className="text-amber-500">Scope</span>
          </span>
        </div>

        {/* Headline */}
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
            GitHub analytics,<br />
            <span className="text-amber-500">without the noise.</span>
          </h1>
          <p className="text-[#94a3b8] text-lg mt-5 leading-relaxed max-w-md">
            Search any GitHub user or organization and instantly see their repositories,
            language breakdown, contributor stats, and activity — all in one dashboard.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 max-w-lg">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 hover:border-amber-500/30 transition-colors"
            >
              <div className="text-amber-500 text-lg mb-2">{f.icon}</div>
              <div className="text-sm font-bold mb-1">{f.title}</div>
              <div className="text-xs text-[#64748b] leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Search */}
      <div className="w-[480px] flex-shrink-0 flex flex-col justify-center px-12 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold mb-2">Search a GitHub user</h2>
          <p className="text-sm text-[#64748b]">
            Enter any GitHub username or organization to get started.
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-3">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b] font-mono text-sm">
            @
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="username or org…"
            className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl py-3.5 pl-9 pr-4 text-sm text-[#f8fafc] placeholder-[#475569] outline-none focus:border-amber-500 transition-colors font-mono"
          />
        </div>

        <button
          onClick={() => handleSearch()}
          className="w-full bg-amber-500 text-black font-bold text-sm py-3.5 rounded-xl hover:bg-amber-400 transition-colors mb-8"
        >
          Analyze Profile →
        </button>

        {/* Suggestions */}
        <div>
          <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-3">
            Try these
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSearch(s)}
                className="font-mono text-xs px-3 py-1.5 rounded-lg border border-[#2a2a2a] text-[#94a3b8] hover:border-amber-500/50 hover:text-amber-500 transition-all"
              >
                @{s}
              </button>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-auto pt-12 text-xs text-[#334155] font-mono">
          Uses GitHub REST API · No auth required to browse
        </div>
      </div>
    </div>
  )
}