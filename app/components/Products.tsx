'use client'

import { useState } from 'react'
import { ShoppingCart, Star, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { products } from '../data/products'
import type { Product } from '../types'

interface ProductsProps {
  onAddToCart: (product: Product) => void
}

export default function Products({ onAddToCart }: ProductsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'apple', label: 'Apple' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'google', label: 'Google' },
  ]

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter)

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-amber-400 text-amber-400" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-600" />)
    }

    return stars
  }

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Products</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our curated selection of premium smartphones with the latest technology.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass rounded-xl p-1 inline-flex">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-lg font-medium smooth-transition ${
                  activeFilter === category.id
                    ? 'gradient-bg text-white'
                    : 'text-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card fade-in-up hover-lift card-glass rounded-2xl overflow-hidden smooth-transition"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                <div className="relative w-full h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transform hover:scale-105 smooth-transition duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  {product.isNew && (
                    <span className="glass px-3 py-1 rounded-full text-xs font-bold">
                      New
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-red-500/80 text-white px-3 py-1 rounded-full text-xs font-bold ml-2">
                      Sale
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                      <span className="text-gray-400 ml-2 text-sm">{product.rating}</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold gradient-text">
                    ${product.price}
                  </span>
                </div>
                <p className="text-gray-400 mb-6">{product.description}</p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="add-to-cart gradient-bg text-white py-3 px-6 rounded-xl font-medium hover-lift smooth-transition w-full flex items-center justify-center"
                  >
                    <ShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 fade-in-up">
          <a
            href="#"
            className="glass px-8 py-4 rounded-xl font-bold text-lg hover-lift smooth-transition inline-flex items-center"
          >
            View All Products <ChevronRight className="ml-3" />
          </a>
        </div>
      </div>
    </section>
  )
}