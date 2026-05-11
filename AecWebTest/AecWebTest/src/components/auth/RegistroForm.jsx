import { useState } from 'react'
import { cadastro } from '../../services/authService'

export default function RegistroForm({ onToggle }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [carregando, setCarregando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await cadastro(form.username, form.password)
      setSucesso(true)
    } catch (err) {
      setErro(err.response?.data?.message ?? 'Erro ao cadastrar.')
    } finally {
      setCarregando(false)
    }
  }

  if (sucesso) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <p className="text-green-600 font-semibold text-lg mb-4">Cadastro realizado com sucesso!</p>
        <button onClick={onToggle} className="text-blue-600 hover:underline text-sm">
          Fazer login
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Cadastro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {erro && <p className="text-red-500 text-sm">{erro}</p>}
          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Já tem conta?{' '}
          <button onClick={onToggle} className="text-blue-600 hover:underline">
            Fazer login
          </button>
        </p>
      </div>
    </div>
  )
}