import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { setUsername, resetFilters, removeFromHistory } from '../../store/searchSlice'

export default function Header() {
  const dispatch = useAppDispatch()
  const username = useAppSelector((s) => s.search.username)
  const history = useAppSelector((s) => s.search.history)
  const [input, setInput] = useState(username)

  function handleSearch(val?: string) {
    const trimmed = (val ?? input).trim().toLowerCase()
    if (!trimmed) return
    setInput(trimmed)
    dispatch(setUsername(trimmed))
    dispatch(resetFilters())
  }

  return (
    <header className="bg-[#111118] border-b border-[#2a2a3a] px-8 py-3 sticky top-0 z-10">
      {/* Main row */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
            ⌕
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search GitHub username or org…"
            className="w-full bg-[#1a1a26] border border-[#2a2a3a] rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-300 transition-colors"
          />
        </div>
        <button
          onClick={() => handleSearch()}
          className="bg-emerald-300 text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-80 transition-opacity"
        >
          Analyze →
        </button>
        <div className="ml-auto w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center text-xs font-bold text-white">
          U
        </div>
      </div>

      {/* History chips */}
      {history.length > 0 && (
        <div className="flex items-center gap-2 mt-2.5">
          <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
            Recent:
          </span>
          {history.map((h) => (
            <div key={h} className="flex items-center gap-1">
              <button
                onClick={() => handleSearch(h)}
                className={`text-xs font-mono px-3 py-1 rounded-full border transition-all
                  ${h === username
                    ? 'border-emerald-300/50 text-emerald-300 bg-emerald-300/10'
                    : 'border-[#2a2a3a] text-slate-500 hover:text-slate-300 hover:border-slate-500'
                  }`}
              >
                {h}
              </button>
              {h !== username && (
                <button
                  onClick={() => dispatch(removeFromHistory(h))}
                  className="text-slate-600 hover:text-red-400 transition-colors text-xs"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}