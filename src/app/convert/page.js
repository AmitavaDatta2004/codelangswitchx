'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Canvas, useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const languages = [
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Python', color: '#3776ab' },
  { name: 'Java', color: '#007396' },
  { name: 'C++', color: '#00599c' },
  { name: 'Ruby', color: '#cc342d' }
]

function RotatingCube({ color }) {
  const meshRef = useRef()
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta * 0.5
  })
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function CodeConverter() {
  const [sourceCode, setSourceCode] = useState('')
  const [convertedCode, setConvertedCode] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('JavaScript')
  const [targetLanguage, setTargetLanguage] = useState('Python')
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleConvert = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceCode,
          sourceLanguage,
          targetLanguage,
        }),
      })

      if (!response.ok) {
        throw new Error('Conversion failed')
      }

      const data = await response.json()
      setConvertedCode(data.convertedCode)
    } catch (error) {
      console.error('Error:', error)
      setConvertedCode('An error occurred during conversion')
    } finally {
      setIsLoading(false)
    }
  }

  const getLanguageColor = (languageName) => {
    return languages.find(lang => lang.name === languageName)?.color || '#ffffff'
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Code Converter</h1>
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Source Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.name} value={lang.name}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: lang.color }}></div>
                    {lang.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Target Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.name} value={lang.name}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: lang.color }}></div>
                    {lang.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Textarea
            placeholder="Enter your code here"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            className="h-64 mb-2"
          />
          <div className="h-32">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <RotatingCube color={getLanguageColor(sourceLanguage)} />
            </Canvas>
          </div>
        </div>
        <div>
          <Textarea
            placeholder="Converted code will appear here"
            value={convertedCode}
            readOnly
            className="h-64 mb-2"
          />
          <div className="h-32">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <RotatingCube color={getLanguageColor(targetLanguage)} />
            </Canvas>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Button onClick={handleConvert} disabled={isLoading}>
          {isLoading ? 'Converting...' : 'Convert'}
        </Button>
      </div>
    </div>
  )
}