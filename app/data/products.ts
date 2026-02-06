import { Product } from '../types'

export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 1099,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Titanium design, A17 Pro chip, 48MP camera',
    category: 'apple',
    features: ['Titanium', 'A17 Pro', '48MP Camera'],
    isNew: true
  },
  {
    id: 2,
    name: 'Galaxy S23 Ultra',
    brand: 'Samsung',
    price: 1199,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: '200MP camera, S Pen, Snapdragon 8 Gen 2',
    category: 'samsung',
    features: ['200MP Camera', 'S Pen', 'Snapdragon 8 Gen 2']
  },
  {
    id: 3,
    name: 'Pixel 8 Pro',
    brand: 'Google',
    price: 999,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Tensor G3, Magic Editor, Super Actua display',
    category: 'google',
    features: ['Tensor G3', 'Magic Editor', 'Super Actua'],
    isOnSale: true
  },
  {
    id: 4,
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    price: 999,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Dynamic Island, 48MP camera, A16 Bionic',
    category: 'apple',
    features: ['Dynamic Island', '48MP Camera', 'A16 Bionic']
  },
  {
    id: 5,
    name: 'Galaxy Z Fold 5',
    brand: 'Samsung',
    price: 1799,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Foldable display, Snapdragon 8 Gen 2',
    category: 'samsung',
    features: ['Foldable', 'Snapdragon 8 Gen 2', 'S Pen'],
    isNew: true
  },
  {
    id: 6,
    name: 'Pixel 7 Pro',
    brand: 'Google',
    price: 899,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1675854653758-68c6094e28e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Tensor G2, Super Res Zoom, Magic Eraser',
    category: 'google',
    features: ['Tensor G2', 'Super Res Zoom', 'Magic Eraser'],
    isOnSale: true
  },
]