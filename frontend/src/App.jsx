import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import HomePage from "./components/HomePage"
import Navbar from "./components/Navbar"

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return (
    <>
    <Navbar />
    <HomePage />
    </>
  )
}

export default App