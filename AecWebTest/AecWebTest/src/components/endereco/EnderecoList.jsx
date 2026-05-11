import { useEffect, useState } from 'react'
import { listar, excluir, exportarCsv } from '../../services/enderecoService'
import EnderecoForm from './EnderecoForm'

export default function EnderecoList() {
  const [enderecos, setEnderecos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState(null)

  const carregar = async () => {
    try {
      const data = await listar()
      setEnderecos(data.data)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => { carregar() }, [])

  const handleExcluir = async (id) => {
    if (!confirm('Excluir este endereço?')) return
    await excluir(id)
    setEnderecos(prev => prev.filter(e => e.id !== id))
  }

  const handleSalvo = () => {
    setModalAberto(false)
    setEditando(null)
    carregar()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-5xl font-black tracking-tight leading-none">endereços.</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-white/25 mt-2">
            {enderecos.length} salvo{enderecos.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          {enderecos.length > 0 && (
            <button onClick={exportarCsv}
              className="text-xs font-bold uppercase tracking-wider text-white/30 border border-white/10 px-5 py-3 rounded-lg hover:text-white hover:border-white/30 transition">
              ↓ csv
            </button>
          )}
          <button onClick={() => { setEditando(null); setModalAberto(true) }}
            className="text-xs font-black uppercase tracking-wider bg-green-400 text-black px-5 py-3 rounded-lg hover:opacity-90 transition">
            + novo
          </button>
        </div>
      </div>

      {/* Lista */}
      {carregando ? (
        <p className="text-white/25 text-sm font-bold uppercase tracking-wider py-20 text-center">
          carregando...
        </p>
      ) : enderecos.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-5xl mb-5">📍</p>
          <p className="text-white/40 text-sm font-bold uppercase tracking-wider">nenhum endereço ainda</p>
          <p className="text-white/20 text-xs mt-2">clique em "+ novo" para começar</p>
        </div>
      ) : (
        <div className="divide-y divide-white/7">
          {enderecos.map(e => (
            <div key={e.id} className="flex items-center justify-between py-5 group">
              <div>
                <p className="text-base font-bold tracking-tight text-white">
                  {e.logradouro}, {e.numero}
                  {e.complemento && <span className="text-white/30 font-normal"> · {e.complemento}</span>}
                </p>
                <p className="text-sm text-white/30 mt-0.5 tracking-tight">
                  {e.bairro} · {e.cidade} · {e.uf} · {e.cep}
                </p>
              </div>
              <div className="flex gap-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => { setEditando(e); setModalAberto(true) }}
                  className="text-xs font-bold uppercase tracking-wider text-white/30 hover:text-white transition">
                  editar
                </button>
                <button
                  onClick={() => handleExcluir(e.id)}
                  className="text-xs font-bold uppercase tracking-wider text-white/30 hover:text-red-400 transition">
                  excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalAberto && (
        <EnderecoForm
          endereco={editando}
          onSalvo={handleSalvo}
          onFechar={() => { setModalAberto(false); setEditando(null) }}
        />
      )}
    </div>
  )
}