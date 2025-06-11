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
    <div className='px-12 py-8 '>
    <Outlet />
    </div>
    </ThemeProvider>
  )
}

export default App