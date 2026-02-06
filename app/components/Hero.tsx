'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Only show scroll animations after mount
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  // Generate stable particle positions on mount
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([])
  
  useEffect(() => {
    if (isMounted) {
      // Generate stable particle positions
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
      }))
      setParticles(newParticles)
    }
  }, [isMounted])

  // Don't render anything on server or during initial hydration
  if (!isMounted) {
    return (
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-darker-bg to-dark-bg"
      >
        {/* Static fallback without animations */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-white/10 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Next Generation Technology
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              <span className="block">ELEVATE YOUR</span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  DIGITAL
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-cyan-400/20 blur-3xl" />
              </span>
              <span className="block">EXPERIENCE</span>
            </h1>
            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-xl text-gray-300 leading-relaxed">
                Discover the future of mobile technology with our curated collection of 
                <span className="font-semibold text-white"> premium smartphones</span>. 
                Where innovation meets elegance, and performance knows no bounds.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-darker-bg to-dark-bg"
    >
      {/* Animated background gradient - Only after mount */}
      <AnimatePresence>
        {isLoaded && (
          <>
            <div className="absolute inset-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 2,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/5 via-transparent to-cyan-600/5 rounded-full blur-3xl"
              />
            </div>

            {/* Floating particles with stable positions */}
            <div className="absolute inset-0 overflow-hidden">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-[1px] h-[1px] bg-white/20 rounded-full"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    y: [0, -100],
                    x: [0, Math.random() * 100 - 50],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Badge with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Next Generation Technology
            </span>
          </motion.div>

          {/* Main headline with staggered animation */}
          <div className="mb-8 overflow-hidden">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={isLoaded ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                <span className="block">ELEVATE YOUR</span>
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    DIGITAL
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-cyan-400/20 blur-3xl" />
                </span>
                <span className="block">EXPERIENCE</span>
              </h1>
            </motion.div>
          </div>

          {/* Subheading with fade in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover the future of mobile technology with our curated collection of 
              <span className="font-semibold text-white"> premium smartphones</span>. 
              Where innovation meets elegance, and performance knows no bounds.
            </p>
          </motion.div>

          {/* CTA Buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore Collection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold text-lg hover:bg-white/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span>View Demo</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Stats section with counter animation */}
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              >
                {[
                  { value: '500+', label: 'Premium Products', color: 'from-purple-400 to-pink-400' },
                  { value: '98%', label: 'Customer Satisfaction', color: 'from-cyan-400 to-blue-400' },
                  { value: '24/7', label: 'Support Available', color: 'from-green-400 to-emerald-400' },
                  { value: '50K+', label: 'Happy Customers', color: 'from-orange-400 to-red-400' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1, type: "spring" }}
                      className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="text-sm text-gray-500">Scroll to explore</div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
              >
                <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated gradient lines - Only after mount */}
      <AnimatePresence>
        {isLoaded && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Floating phone mockups in background - Only after mount */}
      <AnimatePresence>
        {isLoaded && (
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.1,
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <div className="w-48 h-96 rounded-[40px] border-[12px] border-white/20 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}