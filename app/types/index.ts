export interface Product {
  id: number
  name: string
  brand: string
  price: number
  rating: number
  image: string
  description: string
  category: 'apple' | 'samsung' | 'google' | 'other'
  features: string[]
  isNew?: boolean
  isOnSale?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}