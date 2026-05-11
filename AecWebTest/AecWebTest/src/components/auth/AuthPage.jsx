import { useState } from 'react'
import { login, cadastro, meusDados } from '../../services/authService'
import { useAuth } from '../../contexts/AuthContext'

function Globe() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[50] h-[50]">
      <defs>
        <clipPath id="gc"><circle cx="100" cy="100" r="80" /></clipPath>
        <radialGradient id="og" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#1a2e1a" />
          <stop offset="100%" stopColor="#0a130a" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#og)" stroke="rgba(74,222,128,0.15)" strokeWidth="1" />
      <g clipPath="url(#gc)">
        <path d="M45,65 Q65,50 90,57 Q115,53 130,70 Q145,80 140,100 Q150,115 135,133 Q125,150 103,153 Q80,157 63,143 Q40,133 35,110 Q27,85 45,65Z" fill="#14532d" opacity="0.9" />
        <path d="M60,90 Q73,83 85,90 Q97,83 110,90 Q115,100 105,105 Q93,110 80,107 Q65,105 60,90Z" fill="#166534" opacity="0.7" />
        <ellipse cx="153" cy="80" rx="14" ry="9" fill="#14532d" />
        <ellipse cx="40" cy="138" rx="10" ry="7" fill="#15803d" />
        <path d="M75,95 L95,105 L110,125 L103,143" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M85,90 L100,75 L125,73" fill="none" stroke="#4ade80" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <circle cx="57" cy="83" r="3" fill="#4ade80" opacity="0.5" />
        <circle cx="65" cy="77" r="2.5" fill="#4ade80" opacity="0.4" />
        <circle cx="125" cy="105" r="3" fill="#4ade80" opacity="0.5" />
      </g>
      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(74,222,128,0.08)" strokeWidth="0.8" />
      <ellipse cx="100" cy="100" rx="80" ry="27" fill="none" stroke="rgba(74,222,128,0.06)" strokeWidth="0.6" />
      <ellipse cx="100" cy="100" rx="80" ry="54" fill="none" stroke="rgba(74,222,128,0.05)" strokeWidth="0.6" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(74,222,128,0.06)" strokeWidth="0.6" />
      <g>
        <circle cx="90" cy="82" r="5.5" fill="#4ade80" />
        <circle cx="90" cy="82" r="3" fill="#000" />
        <line x1="90" y1="87.5" x2="90" y2="96" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g>
        <circle cx="116" cy="112" r="4.5" fill="#86efac" />
        <circle cx="116" cy="112" r="2.5" fill="#000" />
        <line x1="116" y1="116.5" x2="116" y2="124" stroke="#86efac" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <g>
        <circle cx="74" cy="120" r="4" fill="#bbf7d0" />
        <circle cx="74" cy="120" r="2.2" fill="#000" />
        <line x1="74" y1="124" x2="74" y2="131" stroke="#bbf7d0" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export default function AuthPage() {
  const { salvarLogin } = useAuth()
  const [aba, setAba] = useState('login')
  const [form, setForm] = useState({ username: '', password: '', nome: '' })
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {

      const response = await login(form.username, form.password)
      const token = response.data.token
      const usuario = await meusDados(response.data.token)

      salvarLogin(token, usuario.data)
    } catch {
      setErro('Usuário ou senha inválidos.')
    } finally {
      setCarregando(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setErro('')
    setSucesso('')
    setCarregando(true)
    try {
      await cadastro(form.username, form.password, form.nome)
      setSucesso('Conta criada! Faça login.')
      setAba('login')
      setForm({ username: '', password: '' })
    } catch (err) {
      setErro(err.response?.data?.message ?? 'Erro ao cadastrar.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-white/8">
        <span className="text-base font-black tracking-tight">
          perto<span className="text-green-400">.</span>casa
        </span>
      </nav>

      {/* Conteúdo */}
      <div className="flex-1 flex items-center justify-center gap-20 px-8 py-12 flex-wrap">
        {/* Form */}
        <div className="flex flex-col">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-green-400 mb-4">
            seus endereços
          </p>
          <h1 className="text-6xl font-black tracking-tight leading-none mb-3">
            perto<br />de casa.
          </h1>
          <p className="text-sm text-white/35 leading-relaxed max-w-[65] mb-10">
            Salve, organize e exporte os endereços que importam pra você.
          </p>

          {/* Abas */}
          <div className="flex gap-0 border-b border-white/10 mb-7">
            {['login', 'cadastro'].map(t => (
              <button key={t}
                onClick={() => { setAba(t); setErro(''); setSucesso('') }}
                className={`text-[13px] font-medium pb-3 mr-7 border-b-2 -mb-px transition-all
                  ${aba === t
                    ? 'text-white border-green-400'
                    : 'text-white/30 border-transparent hover:text-white/60'}`}>
                {t}
              </button>
            ))}
          </div>

          {sucesso && (
            <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-5">{sucesso}</p>
          )}
          {erro && (
            <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-5">{erro}</p>
          )}
          {aba === 'cadastro' && (
            <div className='pb-3'>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-white/25 mb-2">
                nome
              </label>

              <input
                type="text"
                required
                value={form.nome}
                onChange={e =>
                  setForm({
                    ...form,
                    nome: e.target.value
                  })
                }
                placeholder="Seu nome"
                className="w-[70] bg-white/4 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder-white/15 outline-none focus:border-green-400 transition"
              />
            </div>
          )}
          <form onSubmit={aba === 'login' ? handleLogin : handleRegister} className="flex flex-col gap-4 ">
            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-white/25 mb-2">
                username
              </label>
              <input type="text" required value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                placeholder="seu_usuario"
                className="w-[70] bg-white/4 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder-white/15 outline-none focus:border-green-400 transition" />
            </div>
            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-white/25 mb-2">
                senha
              </label>
              <input type="password" required value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-[70] bg-white/4 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder-white/15 outline-none focus:border-green-400 transition" />
            </div>
            <button type="submit" disabled={carregando}
              className="w-[70] py-3.5 bg-green-400 text-black text-sm font-black tracking-tight rounded-lg hover:opacity-90 transition disabled:opacity-40 mt-1">
              {carregando ? 'aguarde...' : aba === 'login' ? 'entrar' : 'criar conta'}
            </button>
          </form>
        </div>

        {/* Globo */}
        <div className="flex flex-col items-center gap-5">
          <Globe />
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/20">
            perto · de · casa
          </p>
        </div>
      </div>
    </div>
  )
}