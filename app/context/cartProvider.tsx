'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { CartContext } from './cartContext'
import { Product } from '@/types/product'
import { CartItem, ShoppingCart } from '@/types/cart'

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<{ productId: Product; quantity: number }[]>([])

  const removeItem = () => {

  }

  const addItem = (data: Product, qty: number) => {
    if (items.find((product) => product.productId.id == data.id)) {
      setItems(prev => {
        return prev.map((item) => {
          if (item.productId.id == data.id) {
            return { ...item, quantity: qty }
          } else {
            return item;
          }
        })
      })
    } else {
      const newItems = {
        productId: data,
        quantity: qty
      }
      setItems([...items, newItems])
    }
  }

  useEffect(() => {
    console.log(items)
  }, [items])


  const updateItemQuantity = (productId: number, quantity: number) => {
    const product = items.find((product) => product.productId.id === productId)
    if (product!.productId.weight > quantity) {
      setItems(prev => prev.filter(item => item.productId.id !== productId))
    } else {
      setItems(prev => {
        return prev.map((items) => {
          if (items.productId.id == productId) {
            return { ...items, quantity }
          }
          return items
        })
      })
    }
  }
  const getTotalPrice = (): number => {
    let sum = 0
    items.map((data) => {
      sum += data.productId.price * data.quantity
    })
    return sum
  }




  // useEffect(() => {
  //   const data = () => {
  //     vegetableList.forEach(vegetable => {
  //       const categoryVegetables = newVegetableMap.get(vegetable.category) || [];
  //       newVegetableMap.set(vegetable.category, [...categoryVegetables, vegetable]);
  //     })
  //   }
  //   data()
  //   setProductListByCategory(newVegetableMap)
  // }, [])


  // useEffect(() => {
  //   setProductListByCategory(newVegetableMap)
  // }, [])

  return (
    <CartContext.Provider value={{ items, removeItem, addItem, updateItemQuantity, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider