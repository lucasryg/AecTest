import { useAuth } from '../../contexts/AuthContext'

export default function Navbar() {
  const { usuario, logout } = useAuth()

  return (
    <nav className="flex justify-between items-center px-8 py-6 border-b border-white/8">
      <span className="text-base font-black tracking-tight text-white">
        perto<span className="text-green-400">.</span>casa
      </span>
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold tracking-wider uppercase text-white/25">
          {usuario?.username}
        </span>
        <button onClick={logout}
          className="text-xs font-bold tracking-wider uppercase text-white/25 border border-white/10 px-4 py-2 rounded-lg hover:text-white hover:border-white/30 transition">
          sair
        </button>
      </div>
    </nav>
  )
}