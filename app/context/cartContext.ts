import { ShoppingCart } from '@/types/cart'
import { createContext, useContext } from 'react'

export const CartContext = createContext<ShoppingCart | undefined>(undefined)

export const useCartContext = () => {
  const ctx = useContext(CartContext)
  if (ctx === undefined) throw new Error('Outside of provider')
  return ctx
}
