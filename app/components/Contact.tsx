'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Twitter, Instagram, Facebook, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ firstName: '', lastName: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="p-12 gradient-bg relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-64 -translate-x-64" />

              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-8">
                  Get In <span className="text-white">Touch</span>
                </h2>
                <p className="text-white/80 mb-10 max-w-md">
                  Have questions or need assistance? Our team is ready to help you find the perfect device.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-xl mr-4">
                      <MapPin className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Visit Our Store</h4>
                      <p className="text-white/80">456 Tech Avenue, San Francisco, CA 94016</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-xl mr-4">
                      <Clock className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Opening Hours</h4>
                      <p className="text-white/80">Mon-Fri: 9am-7pm</p>
                      <p className="text-white/80">Sat-Sun: 10am-5pm</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-xl mr-4">
                      <Phone className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Call Us</h4>
                      <p className="text-white/80">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-xl mr-4">
                      <Mail className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Email</h4>
                      <p className="text-white/80">info@phonevault.com</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="font-bold text-white mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/30 smooth-transition"
                    >
                      <Twitter className="text-white" />
                    </a>
                    <a
                      href="#"
                      className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/30 smooth-transition"
                    >
                      <Instagram className="text-white" />
                    </a>
                    <a
                      href="#"
                      className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/30 smooth-transition"
                    >
                      <Facebook className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-12">
              <h3 className="text-3xl font-bold mb-2">Send a Message</h3>
              <p className="text-gray-400 mb-8">We'll get back to you within 24 hours</p>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full glass px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 smooth-transition"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full glass px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 smooth-transition"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full glass px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 smooth-transition"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full glass px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 smooth-transition"
                    placeholder="Your message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="gradient-bg text-white font-bold py-4 px-8 rounded-xl hover-lift w-full smooth-transition flex items-center justify-center"
                >
                  Send Message <Send className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}