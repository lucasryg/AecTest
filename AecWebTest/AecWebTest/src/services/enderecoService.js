import axios from 'axios'
import api from './api'

export const listar = async () => {
  return await api.get('/endereco')
}

export const obterPorId = async (id) => {
  return await api.get(`/endereco/${id}`)
}

export const criar = async (endereco) => {
  return await api.post('/endereco', endereco)
}

export const atualizar = async (id, endereco) => {
  return await api.put(`/endereco/${id}`, endereco)
}

export const excluir = async (id) => {
  await api.delete(`/endereco/${id}`)
}

export const exportarCsv = async () => {
  try {
    const response = await api.get('/endereco/exportar/csv', {
      responseType: 'blob'
    })

    const blob = new Blob(
      [response.data],
      { type: 'text/csv;charset=utf-8;' }
    )

    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url

    const data = new Date()
      .toISOString()
      .split('T')[0]

    link.download = `enderecos-${data}.csv`

    document.body.appendChild(link)

    link.click()

    link.remove()

    window.URL.revokeObjectURL(url)

  } catch (err) {
    console.error('Erro ao exportar CSV:', err)
    alert('Erro ao exportar arquivo.')
  }
}

export async function buscarCep(cep) {
  const cepLimpo = cep.replace(/\D/g, '')

  if (cepLimpo.length !== 8) {
    throw new Error('CEP inválido')
  }

  const response = await axios.get(
    `https://viacep.com.br/ws/${cepLimpo}/json/`
  )

  if (response.data.erro) {
    throw new Error('CEP não encontrado')
  }

  return response.data
}