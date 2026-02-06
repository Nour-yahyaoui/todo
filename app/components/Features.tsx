import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react'
import type { Feature } from '../types'

export default function Features() {
  const features: Feature[] = [
    {
      icon: <Truck className="text-white text-2xl" />,
      title: 'Free Shipping',
      description: 'Free delivery on all orders over $200 with express shipping options.'
    },
    {
      icon: <Shield className="text-white text-2xl" />,
      title: '2-Year Warranty',
      description: 'Extended warranty on all products for complete peace of mind.'
    },
    {
      icon: <RefreshCw className="text-white text-2xl" />,
      title: '30-Day Returns',
      description: 'Hassle-free returns within 30 days if you\'re not satisfied.'
    },
    {
      icon: <Headphones className="text-white text-2xl" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for any questions or issues.'
    }
  ]

  return (
    <section id="features" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500 rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500 rounded-full opacity-5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We provide exceptional service and premium products for tech enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 text-center hover-lift smooth-transition fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="gradient-bg w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}