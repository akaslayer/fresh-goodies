import { Product } from '@/types/product'
import { createContext, useContext } from 'react'

interface vegetableContextType {
  vegetableList: Product[]
  categoryList: string[]
  filterData: Product[]
  categoryFilter: string
  drawerIndex: number
  productListByCategory: Map<string, Product[]>
  setCategoryFilter: (query: string) => void
  setDrawerIndex: (query: number) => void
  onOpen: () => void
  isOpen: boolean
  onClose: () => void
}

export const VegetableContext = createContext<vegetableContextType | undefined>(
  undefined
)

export const useVegetableContext = () => {
  const ctx = useContext(VegetableContext)
  if (ctx === undefined) throw new Error('Outside of provider')
  return ctx
}
