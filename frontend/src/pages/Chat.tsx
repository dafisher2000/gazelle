import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Send } from 'lucide-react'

interface SupplyResult {
  id: number
  name: string
  category: string
  quantity: number
  location: string
  latitude?: number
  longitude?: number
  mapLink?: string
  staticMapUrl?: string
  available: boolean
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  supplies?: SupplyResult[]
}

const translations = {
  en: {
    provider: {
      title: 'Donate Supplies',
      placeholder: 'Type your message here...',
      initialMessage: "Hello! Thank you for wanting to help. I'm here to assist you in donating supplies. What items do you have available to donate?",
    },
    seeker: {
      title: 'Find Supplies',
      placeholder: 'Type your message here...',
      initialMessage: "Hello! I'm here to help you find the supplies you need. What are you looking for today?",
    },
    send: 'Send',
    back: 'Back',
  },
  es: {
    provider: {
      title: 'Donar Suministros',
      placeholder: 'Escribe tu mensaje aquí...',
      initialMessage: "¡Hola! Gracias por querer ayudar. Estoy aquí para asistirte en donar suministros. ¿Qué artículos tienes disponibles para donar?",
    },
    seeker: {
      title: 'Encontrar Suministros',
      placeholder: 'Escribe tu mensaje aquí...',
      initialMessage: "¡Hola! Estoy aquí para ayudarte a encontrar los suministros que necesitas. ¿Qué estás buscando hoy?",
    },
    send: 'Enviar',
    back: 'Volver',
  },
}

const Chat = () => {
  const { type } = useParams<{ type: 'provider' | 'seeker' }>()
  const navigate = useNavigate()
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('gazelle-language') as 'en' | 'es'
    if (savedLanguage) {
      setLang(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Add initial greeting message
    if (type && messages.length === 0) {
      const greeting = type === 'provider'
        ? translations[lang].provider.initialMessage
        : translations[lang].seeker.initialMessage

      setMessages([
        {
          role: 'assistant',
          content: greeting,
        },
      ])
    }
  }, [type, lang])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setLoading(true)

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      // Call API
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'
      const response = await fetch(`${apiUrl}/api/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          type: type,
          language: lang,
          conversationHistory: messages,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()

      // Add assistant response with supplies if found
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.response || 'I apologize, but I encountered an error. Please try again.',
          supplies: data.suppliesFound || undefined
        },
      ])
    } catch (error) {
      console.error('Error sending message:', error)
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: lang === 'en'
            ? 'I apologize, but I encountered an error. Please try again.'
            : 'Lo siento, pero encontré un error. Por favor, inténtelo de nuevo.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const t = type === 'provider' ? translations[lang].provider : translations[lang].seeker

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-900">{t.title}</h1>
          <p className="text-sm text-gray-500">AI Assistant</p>
        </div>
        <button
          onClick={() => {
            const newLang = lang === 'en' ? 'es' : 'en'
            setLang(newLang)
            localStorage.setItem('gazelle-language', newLang)
          }}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {lang === 'en' ? 'ES' : 'EN'}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>

              {/* Show maps for supplies found */}
              {message.supplies && message.supplies.length > 0 && (
                <div className="mt-4 space-y-3">
                  {message.supplies.map((supply, supplyIndex) => (
                    <div key={supplyIndex} className="border-t pt-3">
                      {supply.staticMapUrl && (
                        <div className="mb-2">
                          <a
                            href={supply.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:opacity-90 transition-opacity"
                          >
                            <img
                              src={supply.staticMapUrl}
                              alt={`Map to ${supply.location}`}
                              className="w-full rounded-lg border border-gray-300"
                            />
                            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                              📍 {lang === 'en' ? 'Click to open in maps' : 'Clic para abrir en mapas'}
                            </p>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">{translations[lang].send}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
