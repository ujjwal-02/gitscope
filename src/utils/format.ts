export function formatNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`
  return `${Math.floor(diff / 31536000)}y ago`
}

export function getLanguageColor(lang: string): string {
  const colors: Record<string, string> = {
    TypeScript: '#818cf8',
    JavaScript: '#fbbf24',
    Python: '#6ee7b7',
    C: '#64748b',
    'C++': '#f472b6',
    Java: '#fb923c',
    Go: '#34d399',
    Rust: '#f87171',
    Shell: '#a78bfa',
    Ruby: '#f43f5e',
  }
  return colors[lang] ?? '#94a3b8'
}