import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center text-slate-200">
      <div className="text-center">
        <div className="text-8xl font-extrabold font-mono text-[#2a2a3a]">404</div>
        <div className="text-xl font-bold mt-4">Page not found</div>
        <div className="text-slate-500 text-sm mt-2">
          The page you're looking for doesn't exist.
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-8 bg-emerald-300 text-black font-bold text-sm px-6 py-3 rounded-xl hover:opacity-80 transition-opacity"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  )
}