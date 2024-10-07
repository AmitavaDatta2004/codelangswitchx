'use client'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere({ darkMode }) {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time / 4)
    meshRef.current.rotation.y = Math.sin(time / 2)
    meshRef.current.position.z = Math.sin(time) * 2
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color={darkMode ? "#4a5568" : "#e2e8f0"} wireframe />
    </mesh>
  )
}

export default function DynamicBackground({ darkMode }) {
  return (
    <>
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere darkMode={darkMode} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
    </>
  )
}