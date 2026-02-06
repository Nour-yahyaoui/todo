import { Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-3 mb-4">
              <div className="gradient-bg w-10 h-10 rounded-xl flex items-center justify-center">
                <Phone className="text-white" />
              </div>
              <h2 className="text-2xl font-bold">
                Phone<span className="gradient-text">Vault</span>
              </h2>
            </div>
            <p className="text-gray-500">Premium smartphones & accessories</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-500 mb-2">&copy; {new Date().getFullYear()} PhoneVault. All rights reserved.</p>
            <p className="text-gray-500">This is a modern dark theme publicity website.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}