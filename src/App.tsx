import { Outlet, useNavigate } from 'react-router'
import { useAuth } from '@/utils/authen/auth'
import { useEffect } from 'react'
import { ThemeProvider } from './components/theme-provider'
function App() {
  const navigate = useNavigate()
  const { token } = useAuth()
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  },[token, navigate])
  return (
    <ThemeProvider defaultTheme='dark'>
    <Outlet />
    </ThemeProvider>
  )
}

export default App