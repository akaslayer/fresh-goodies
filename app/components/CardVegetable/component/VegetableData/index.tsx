'use client'
import { useVegetableContext } from '@/app/context/vegetableContext'
import { Product } from '@/types/product'
import {
  useDisclosure
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import VegetableCardDetail from './component/VegetableTableCard'
import { useCartContext } from '@/app/context/cartContext'

const VegetableData: React.FC<Product> = ({ imageUrl, price, weight, name, id }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const { onOpen, setDrawerIndex, vegetableList } = useVegetableContext()
  const { items, addItem, updateItemQuantity } = useCartContext()
  const data = vegetableList.find(vegetable => Number(vegetable.id) === Number(id))
  if (!data) {
    return null
  }
  const product = items.find(data => data.productId.id === id)
  const handleDrawerOpen = () => {
    onOpen()
    setDrawerIndex(id)
  }
  const handleError = () => {
    setImgSrc('/products/cucumber.png');
  };

  const handleAddItem = (data: Product, quantity: number) => {
    addItem(data, quantity)
  }
  const handleMinusData = (id: number, qty: number) => {
    const quantity = qty - 100
    updateItemQuantity(id, quantity)
  }

  const handlePlusData = (id: number, qty: number) => {
    const quantity = qty + 100
    updateItemQuantity(id, quantity)
  }

  return (
    <div className="card bg-slate-100 px-3 py-[11px] flex flex-col">
      <div className="image-container flex justify-center mix-blend-multiply bg-transparant">
        <Image src={imgSrc} alt="" className='w-48 h-48 object-cover' width={500} height={500} onError={handleError} onClick={handleDrawerOpen} />
      </div>
      {product !== undefined ? <h1 className='font-semibold text-[22px]'>${(price * product!.quantity).toFixed(2)}</h1> : <h1 className='font-semibold text-[22px]'>${(price * weight).toFixed(2)}</h1>}
      <h2 className='flex flex-1'>{name}</h2>
      {!product ? (
        <div className="interact flex justify-between items-center">
          <h3 className='text-slate-500 text-md'>{weight / 1000} kg</h3>
          <div className="p-2 border-2 border-gray-200 rounded-full" onClick={() => handleAddItem(data, weight)}>
            <FaPlus className=' text-black' />
          </div>
        </div>
      ) : (
        <div className="interact flex justify-between items-center">
          <div className="p-4 border-2 bg-black border-gray-200 rounded-full" onClick={() => handleMinusData(product.productId.id, product.quantity)}>
            <FaMinus className=' text-white' />
          </div>
          <h3 className='text-black text-lg'>{product.quantity / 1000} kg</h3>
          <div className="p-4 border-2 bg-black border-gray-200 rounded-full" onClick={() => handlePlusData(product.productId.id, product.quantity)}>
            <FaPlus className=' text-white' />
          </div>
        </div>
      )
      }
      <>
      </>
    </div >
  )
}

export default VegetableData