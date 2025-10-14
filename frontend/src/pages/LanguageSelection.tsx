const LanguageSelection = () => {
  const selectLanguage = (lang: string) => {
    localStorage.setItem('gazelle-language', lang)
    // Force a reload to update the language state in App
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gazelle</h1>
          <p className="text-gray-600">Natural Disaster Resource Matching</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Select Your Language / Seleccione su idioma
          </h2>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => selectLanguage('en')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            English
          </button>

          <button
            onClick={() => selectLanguage('es')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            Español
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          You can change this later in settings
        </p>
      </div>
    </div>
  )
}

export default LanguageSelection
