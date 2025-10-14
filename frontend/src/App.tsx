import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LanguageSelection from './pages/LanguageSelection'
import Home from './pages/Home'
import Chat from './pages/Chat'
import { useEffect, useState } from 'react'

function App() {
  const [language, setLanguage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if language is already selected
    const savedLanguage = localStorage.getItem('gazelle-language')
    setLanguage(savedLanguage)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* If no language selected, show language selection */}
        {!language ? (
          <Route path="*" element={<LanguageSelection />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:type" element={<Chat />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
