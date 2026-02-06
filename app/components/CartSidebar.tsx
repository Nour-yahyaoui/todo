'use client'

import { X, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import type { CartItem } from '../types'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onRemoveItem: (index: number) => void
}

export default function CartSidebar({ isOpen, onClose, cartItems, onRemoveItem }: CartSidebarProps) {
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full md:w-96 h-full glass-dark z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">Your Cart</h3>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 smooth-transition"
            >
              <X className="text-xl" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="glass p-4 rounded-xl flex items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium mb-1">{item.product.name}</h4>
                      <p className="text-gray-400">${item.product.price} × {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-red-400 hover:text-red-300 p-2 smooth-transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between mb-4">
                <span className="text-gray-400">Total</span>
                <span className="text-2xl font-bold gradient-text">${total.toFixed(2)}</span>
              </div>
              <button className="gradient-bg text-white w-full py-4 rounded-xl font-bold hover-lift smooth-transition flex items-center justify-center">
                Checkout <ArrowRight className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}