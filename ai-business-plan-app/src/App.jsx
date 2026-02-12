import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Questionnaire from './pages/Questionnaire'
import Results from './pages/Results'
import Success from './pages/Success'

// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'https://your-api.railway.app'
export const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY || ''

function App() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<Questionnaire />} />
        <Route path="/results" element={<Results />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  )
}

export default App
