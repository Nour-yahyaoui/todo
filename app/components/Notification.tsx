'use client'

import { CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NotificationProps {
  message: string
  type: 'success' | 'error' | 'info'
  isVisible: boolean
  onHide: () => void
}

export default function Notification({ message, type, isVisible, onHide }: NotificationProps) {
  const [shouldRender, setShouldRender] = useState(isVisible)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      const timer = setTimeout(() => {
        onHide()
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onHide])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed top-6 right-6 glass px-6 py-4 rounded-xl z-50 max-w-sm transform transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center">
        <div className="gradient-bg w-10 h-10 rounded-full flex items-center justify-center mr-4">
          <CheckCircle className="text-white" />
        </div>
        <div>
          <p className="font-medium">{message}</p>
        </div>
      </div>
    </div>
  )
}