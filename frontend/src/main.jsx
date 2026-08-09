import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LogIn from './components/LogIn.jsx'
import Users from './components/Users.jsx'
import Feedback from './components/Feedback.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<App />} />
        <Route path="/users" element={<Users />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)