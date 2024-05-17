import { Product } from '@/types/product'
import { useEffect, useState } from 'react'

const useVegetableList = () => {
  const [vegetableList, setVegetableList] = useState<Product[]>([])
  useEffect(() => {
    const fetchVegetableList = async () => {
      const response = await fetch('http://localhost:8080/products')
      if (!response.ok) {
        throw new Error('Failed to fetch Product.')
      }
      const data = await response.json()
      setVegetableList(data)
    }
    fetchVegetableList()
  }, [])
  return { vegetableList }
}

export default useVegetableList
