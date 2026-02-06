'use client'

import { useState } from 'react'
import { ShoppingCart, Moon, Sun, Menu, X, Phone } from 'lucide-react'

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="glass-dark sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="gradient-bg w-10 h-10 rounded-xl flex items-center justify-center">
              <Phone className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold">
              Phone<span className="gradient-text">Vault</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative group text-gray-300 hover:text-white smooth-transition"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full smooth-transition" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 glass rounded-full flex items-center justify-center hover-lift"
            >
              {darkMode ? <Sun className="text-gray-300" /> : <Moon className="text-gray-300" />}
            </button>

            <button
              onClick={onCartClick}
              className="relative w-10 h-10 glass rounded-full flex items-center justify-center hover-lift"
            >
              <ShoppingCart className="text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 gradient-bg text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 glass rounded-full flex items-center justify-center"
            >
              {isMenuOpen ? <X className="text-gray-300" /> : <Menu className="text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-4">
            <div className="glass rounded-xl p-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="py-2 px-4 rounded-lg hover:bg-white/5 smooth-transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}