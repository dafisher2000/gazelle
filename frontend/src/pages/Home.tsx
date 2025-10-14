import { useNavigate } from 'react-router-dom'
import { Package, HandHeart } from 'lucide-react'
import { useEffect, useState } from 'react'

const translations = {
  en: {
    title: 'Gazelle',
    subtitle: 'Emergency Resource Matching',
    description: 'Connecting resources with people in need during disasters',
    haveSupplies: 'I have supplies',
    needSupplies: 'I need supplies',
    haveSuppliesDesc: 'Donate resources to help others',
    needSuppliesDesc: 'Find resources you need',
  },
  es: {
    title: 'Gazelle',
    subtitle: 'Emparejamiento de Recursos de Emergencia',
    description: 'Conectando recursos con personas necesitadas durante desastres',
    haveSupplies: 'Tengo suministros',
    needSupplies: 'Necesito suministros',
    haveSuppliesDesc: 'Donar recursos para ayudar a otros',
    needSuppliesDesc: 'Encuentra los recursos que necesitas',
  },
}

const Home = () => {
  const navigate = useNavigate()
  const [lang, setLang] = useState<'en' | 'es'>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('gazelle-language') as 'en' | 'es'
    if (savedLanguage) {
      setLang(savedLanguage)
    }
  }, [])

  const t = translations[lang]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/gazelle.jpg"
                alt="Gazelle Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600 mt-1">{t.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => {
                const newLang = lang === 'en' ? 'es' : 'en'
                setLang(newLang)
                localStorage.setItem('gazelle-language', newLang)
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {lang === 'en' ? 'Español' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Two Main Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Provider Button */}
          <button
            onClick={() => navigate('/chat/provider')}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-8 border-2 border-transparent hover:border-green-500"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-green-100 p-6 rounded-full group-hover:bg-green-200 transition-colors">
                <HandHeart className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.haveSupplies}
                </h2>
                <p className="text-gray-600">
                  {t.haveSuppliesDesc}
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
                  Start
                  <svg className="w-5 h-5 ml-1 group-hover:ml-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </button>

          {/* Seeker Button */}
          <button
            onClick={() => navigate('/chat/seeker')}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-8 border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-blue-100 p-6 rounded-full group-hover:bg-blue-200 transition-colors">
                <Package className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.needSupplies}
                </h2>
                <p className="text-gray-600">
                  {t.needSuppliesDesc}
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  Start
                  <svg className="w-5 h-5 ml-1 group-hover:ml-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Emergency Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            {lang === 'en'
              ? 'Available 24/7 during emergencies • All services are free'
              : 'Disponible 24/7 durante emergencias • Todos los servicios son gratuitos'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
