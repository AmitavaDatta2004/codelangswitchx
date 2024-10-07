

'use client'
import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRouter } from 'next/navigation'

function AnimatedSphere() {
  const meshRef = useRef()
  const [color, setColor] = useState('#b754d6') 
  const [sphereSize, setSphereSize] = useState(1) 

  useEffect(() => {
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSphereSize(0.5) 
      } else {
        setSphereSize(1) 
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() 

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  
  const handlePointerOver = () => setColor('#e53e3e')
  const handlePointerOut = () => setColor('#b754d6') 
  const handleClick = () => setColor('#38a169') 

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time / 4)
    meshRef.current.rotation.y = Math.sin(time / 2)
    meshRef.current.position.y = Math.sin(time / 3) * 0.2
  })

  return (
    <mesh
      ref={meshRef}
      position={[1, 0, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <sphereGeometry args={[sphereSize, 32, 32]} /> 
      <meshStandardMaterial color={color} wireframe={false} /> 
    </mesh>
  )
}

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
  }, [])

  const handleStartConverting = () => {
    router.push('/convert')
  }

  return (
    <>
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 relative transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Code Converter</h1>

        <div className="mb-12 text-center">
          <p className="mb-4">
            Code Converter is an innovative tool designed to help developers translate code between different programming languages effortlessly.
          </p>
          <p>
            Whether you&apos;re learning a new language or working on a cross-platform project, Code Converter is here to simplify your coding experience.
          </p>
        </div>

        <div className="flex justify-between">
          <div className="h-64 mb-12 w-3/4">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <AnimatedSphere /> 
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>

          
          <div className="w-2/4 p-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Creator: Anirban Ghosh</h2>
            <p className="mb-4">
              Anirban Ghosh is a passionate web developer with expertise in Next.js and Three.js. He loves to explore new technologies and create dynamic web applications.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/kekubhai"
                target="_blank"
                className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-all duration-300"
                >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/anirban-ghosh010/"
                target="_blank"
                className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-all duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={handleStartConverting}
          className={`w-full max-w-xs mx-auto mb-12 px-6 py-3 rounded text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
            darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Start Converting
        </button>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Click the &quot;Start Converting&quot; button above</li>
            <li>Enter your code in the input window</li>
            <li>Select the source and target languages from the dropdowns</li>
            <li>Click the &quot;Convert&quot; button to see the translated code</li>
            <li>Copy the converted code from the output window</li>
          </ol>
        </div>
      </div>
    </main>
            </>
  )
}
