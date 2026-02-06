'use client'

import { useEffect } from 'react'

export default function Particles() {
  useEffect(() => {
    const particlesContainer = document.getElementById('particles')
    if (!particlesContainer) return

    const particleCount = 30
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full bg-white/5'
      
      const size = Math.random() * 5 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      
      const duration = Math.random() * 20 + 10
      particle.style.animation = `float ${duration}s infinite ease-in-out`
      particle.style.animationDelay = `${Math.random() * 5}s`
      
      particlesContainer.appendChild(particle)
    }

    return () => {
      particlesContainer.innerHTML = ''
    }
  }, [])

  return <div id="particles" className="fixed inset-0 overflow-hidden pointer-events-none z-0" />
}