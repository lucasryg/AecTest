import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'
import AuthPage from './components/auth/AuthPage'
import Navbar from './components/shared/Navbar'
import EnderecoList from './components/endereco/EnderecoList'

function AppContent() {
  const { usuario, carregando } = useAuth()

  if (carregando) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-xs font-bold uppercase tracking-widest text-white/20">carregando...</p>
    </div>
  )

  if (!usuario) return <AuthPage />

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="max-w-3xl mx-auto px-8 py-12">
        <EnderecoList />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}