const navItems = [
  { icon: '⊞', label: 'Dashboard', id: 'dashboard' },
  { icon: '◈', label: 'Repositories', id: 'repos' },
  { icon: '◉', label: 'Activity', id: 'activity' },
  { icon: '▦', label: 'Languages', id: 'languages' },
  { icon: '◎', label: 'Contributors', id: 'contributors' },
]

export default function Sidebar() {
  return (
    <aside className="w-52 flex-shrink-0 bg-[#141414] border-r border-[#2a2a2a] flex flex-col h-screen sticky top-0">
      <div className="px-6 py-6 border-b border-[#2a2a2a] flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-black font-bold text-xs">
          ⬡
        </div>
        <span className="font-mono font-bold text-sm">
          Git<span className="text-amber-500">Scope</span>
        </span>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-0.5 mt-2">
        <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest px-3 mb-2">
          Overview
        </p>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all
              ${item.id === 'dashboard'
                ? 'bg-amber-500/10 text-amber-500'
                : 'text-[#64748b] hover:bg-[#1c1c1c] hover:text-[#f8fafc]'
              }`}
          >
            <span className="w-4 text-center text-base">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-[#2a2a2a] font-mono text-[10px] text-[#334155]">
        v1.0.0 · GitScope
      </div>
    </aside>
  )
}