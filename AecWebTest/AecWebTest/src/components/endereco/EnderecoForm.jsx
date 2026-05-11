import { useState } from 'react'
import axios from 'axios'
import { criar, atualizar } from '../../services/enderecoService'

const camposVazios = {
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: ''
}

export default function EnderecoForm({ endereco, onSalvo, onFechar }) {
  const [form, setForm] = useState(endereco ?? camposVazios)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

const buscarCep = async (cep) => {
  try {
    const cepLimpo = cep.replace(/\D/g, '')

    if (cepLimpo.length !== 8) return

    const response = await axios.get(
      `https://viacep.com.br/ws/${cepLimpo}/json/`
    )

    if (response.data.erro) {
      setErro('CEP não encontrado.')
      return
    }

    setForm((prev) => ({
      ...prev,
      cep: cepLimpo,
      logradouro: response.data.logradouro || '',
      bairro: response.data.bairro || '',
      cidade: response.data.localidade || '',
      uf: response.data.uf || ''
    }))
  } catch {
    setErro('Erro ao buscar CEP.')
  }
}

  const handleChange = async (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }))

    if (key === 'cep') {
      const cepFormatado = value
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d)/, '$1-$2')

      setForm((prev) => ({
        ...prev,
        cep: cepFormatado
      }))

      if (cepFormatado.replace(/\D/g, '').length === 8) {
        await buscarCep(cepFormatado)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErro('')
    setCarregando(true)

    try {
      if (endereco) {
        await atualizar(endereco.id, form)
      } else {
        await criar(form)
      }

      onSalvo()
    } catch {
      setErro('Erro ao salvar endereço.')
    } finally {
      setCarregando(false)
    }
  }

  const campo = (label, key, placeholder, opts = {}) => (
    <div className={opts.full ? 'col-span-2' : ''}>
      <label className="block text-[11px] font-bold tracking-widest uppercase text-white/25 mb-2">
        {label}
      </label>

      <input
        type="text"
        value={form[key]}
        onChange={(e) => handleChange(key, e.target.value)}
        placeholder={placeholder}
        required={!opts.optional}
        maxLength={opts.maxLength}
        className="w-full bg-white/4 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/15 outline-none focus:border-green-400 transition"
      />
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black tracking-tight">
            {endereco ? 'editar.' : 'novo endereço.'}
          </h2>

          <button
            onClick={onFechar}
            className="text-white/30 hover:text-white text-xs font-bold uppercase tracking-wider transition"
          >
            fechar
          </button>
        </div>

        {erro && (
          <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
            {erro}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {campo('CEP', 'cep', '00000-000', { maxLength: 9 })}
            {campo('Número', 'numero', '142')}
            {campo('Logradouro', 'logradouro', 'Rua das Flores', { full: true })}
            {campo('Bairro', 'bairro', 'Vila Madalena')}
            {campo('Complemento', 'complemento', 'Apto 12', { optional: true })}
            {campo('Cidade', 'cidade', 'São Paulo')}
            {campo('UF', 'uf', 'SP', { maxLength: 2 })}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={carregando}
              className="flex-1 py-3.5 bg-green-400 text-black text-sm font-black tracking-tight rounded-lg hover:opacity-90 transition disabled:opacity-40"
            >
              {carregando ? 'salvando...' : 'salvar'}
            </button>

            <button
              type="button"
              onClick={onFechar}
              className="px-6 py-3.5 border border-white/10 text-white/40 text-sm font-bold rounded-lg hover:text-white hover:border-white/30 transition"
            >
              cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}