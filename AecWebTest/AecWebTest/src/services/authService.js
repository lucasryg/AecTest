import api from './api'

export const login = async (username, password) => {
  const data = await api.post('/Auth/login', { username, password })
  return data;
}

export const cadastro = async (username, password, nome) => {
  const data = await api.post('/Auth/cadastro', { username, password, nome })
  return data;
}

export const meusDados = async (token) => {
    const data = await api.get('/auth/meusDados', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data;
}

