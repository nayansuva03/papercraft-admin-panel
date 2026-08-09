import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import HomePage from "./components/HomePage"
import Navbar from "./components/Navbar"

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <>
    <Navbar />
    <HomePage />
    </>
  )
}

export default App
