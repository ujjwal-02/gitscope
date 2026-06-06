const navItems = [
  { icon: '⊞', label: 'Dashboard', id: 'dashboard' },
  { icon: '◈', label: 'Repositories', id: 'repos' },
  { icon: '◉', label: 'Activity', id: 'activity' },
  { icon: '▦', label: 'Languages', id: 'languages' },
  { icon: '◎', label: 'Contributors', id: 'contributors' },
]

export default function Sidebar() {
  return (
    <aside className="w-52 flex-shrink-0 bg-[#111118] border-r border-[#2a2a3a] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-[#2a2a3a] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-300 to-indigo-400 flex items-center justify-center text-sm font-bold text-black">
          ⬡
        </div>
        <span className="font-mono text-sm font-bold tracking-tight">
          Git<span className="text-emerald-300">Scope</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-1 mt-2">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
          Overview
        </p>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all
              ${item.id === 'dashboard'
                ? 'bg-emerald-300/10 text-emerald-300'
                : 'text-slate-500 hover:bg-[#1a1a26] hover:text-slate-200'
              }`}
          >
            <span className="w-4 text-center">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-[#2a2a3a] font-mono text-[10px] text-slate-600">
        v1.0.0 · GitScope
      </div>
    </aside>
  )
}