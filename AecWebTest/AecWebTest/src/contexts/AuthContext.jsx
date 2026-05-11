import { createContext, useEffect, useState, useContext} from 'react'
import { meusDados } from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      meusDados()
        .then(setUsuario)
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setCarregando(false))
    } else {
      setCarregando(false)
    }
  }, [])

  const salvarLogin = (token, dadosUsuario) => {
    localStorage.setItem('token', token)
    setUsuario(dadosUsuario)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, salvarLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {       // ← estava faltando isso
  return useContext(AuthContext)
}