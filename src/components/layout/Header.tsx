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
    <header className="bg-[#141414] border-b border-[#2a2a2a] px-8 py-3 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] font-mono text-sm">@</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search username or org…"
            className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl py-2.5 pl-9 pr-4 text-sm text-[#f8fafc] placeholder-[#475569] outline-none focus:border-amber-500 transition-colors font-mono"
          />
        </div>
        <button
          onClick={() => handleSearch()}
          className="bg-amber-500 text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-amber-400 transition-colors"
        >
          Analyze →
        </button>
        <div className="ml-auto w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-black">
          U
        </div>
      </div>

      {history.length > 0 && (
        <div className="flex items-center gap-2 mt-2.5">
          <span className="text-[10px] text-[#475569] uppercase tracking-widest font-bold font-mono">
            Recent:
          </span>
          {history.map((h) => (
            <div key={h} className="flex items-center gap-1">
              <button
                onClick={() => handleSearch(h)}
                className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all
                  ${h === username
                    ? 'border-amber-500/50 text-amber-500 bg-amber-500/10'
                    : 'border-[#2a2a2a] text-[#64748b] hover:text-[#f8fafc] hover:border-[#475569]'
                  }`}
              >
                @{h}
              </button>
              {h !== username && (
                <button
                  onClick={() => dispatch(removeFromHistory(h))}
                  className="text-[#334155] hover:text-red-400 transition-colors text-xs"
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