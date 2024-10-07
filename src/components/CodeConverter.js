'use client'
import { useState } from 'react'

const languages = ['javascript', 'python', 'java', 'c++', 'ruby']

export default function CodeConverter({
  inputCode,
  setInputCode,
  outputCode,
  sourceLanguage,
  setSourceLanguage,
  targetLanguage,
  setTargetLanguage,
  onConvert,
  darkMode,
  languageColors,
}) {
  const [hoveredLanguage, setHoveredLanguage] = useState(null)

  return (

    <>
    <div className="flex flex-col md:flex-row w-full gap-4">
      <div className="flex-1">
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
          className={`mb-2 p-2 w-full rounded transition-colors duration-300 ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
          }`}
          style={{
            backgroundColor: hoveredLanguage === sourceLanguage ? languageColors[sourceLanguage] : '',
            color: hoveredLanguage === sourceLanguage ? '#000' : '',
          }}
          onMouseEnter={() => setHoveredLanguage(sourceLanguage)}
          onMouseLeave={() => setHoveredLanguage(null)}
          >
          {languages.map((lang) => (
            <option
            key={lang}
            value={lang}
            style={{
              backgroundColor: languageColors[lang],
              color: '#000',
            }}
            >
              {lang}
            </option>
          ))}
        </select>
        <textarea
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          className={`w-full h-64 p-2 rounded transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
          placeholder="Enter your code here..."
          />
      </div>
      <div className="flex-1">
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className={`mb-2 p-2 w-full rounded transition-colors duration-300 ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
          }`}
          style={{
            backgroundColor: hoveredLanguage === targetLanguage ? languageColors[targetLanguage] : '',
            color: hoveredLanguage === targetLanguage ? '#000' : '',
          }}
          onMouseEnter={() => setHoveredLanguage(targetLanguage)}
          onMouseLeave={() => setHoveredLanguage(null)}
          >
          {languages.map((lang) => (
            <option
            key={lang}
            value={lang}
            style={{
              backgroundColor: languageColors[lang],
              color: '#000',
            }}
            >
              {lang}
            </option>
          ))}
        </select>
        <textarea
          value={outputCode}
          readOnly
          className={`w-full h-64 p-2 rounded transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
          placeholder="Converted code will appear here..."
          />
      </div>
      <button
        onClick={onConvert}
        className={`mt-4 px-6 py-3 rounded text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
          darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        >
        Convert
      </button>
    </div>
        </>
  )
}