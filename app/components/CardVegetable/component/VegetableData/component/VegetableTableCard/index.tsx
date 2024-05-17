'use client'
import { useCartContext } from '@/app/context/cartContext'
import { useVegetableContext } from '@/app/context/vegetableContext'
import { Product } from '@/types/product'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay
} from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { FaHeart, FaMinus, FaPlus } from 'react-icons/fa'

const VegetableCardDetail = () => {
  const { isOpen, onClose, drawerIndex, vegetableList, setDrawerIndex } = useVegetableContext()
  const { addItem, items, updateItemQuantity } = useCartContext()
  const data = vegetableList.find(vegetable => Number(vegetable.id) === Number(drawerIndex))
  const [vegetableWeight, setVegetableWeight] = useState<number>(data ? data.weight : 0)
  const product = items.find(data => data.productId.id === drawerIndex)

  useEffect(() => {
    if (data && vegetableWeight !== data.weight) {
      setVegetableWeight(data.weight)
    }
  }, [data])

  if (!data) {
    return null
  }

  const handleNextIndex = () => {
    if (Number(drawerIndex) >= Number(vegetableList.length - 1)) {
      setDrawerIndex(0)
    } else {
      setDrawerIndex(Number(drawerIndex) + 1)
    }
  }
  const handlePrevIndex = () => {
    if (Number(drawerIndex) <= 0) {
      setDrawerIndex(vegetableList.length - 1)
    } else {
      setDrawerIndex(Number(drawerIndex) - 1)
    }
  }
  const handleMinusData = (id: number, qty: number) => {
    const quantity = qty - 100
    updateItemQuantity(id, quantity)
  }

  const handlePlusData = (id: number, qty: number) => {
    const quantity = qty + 100
    updateItemQuantity(id, quantity)
  }

  const handleAddWeight = () => {
    setVegetableWeight(vegetableWeight + 100);
  }
  const handleMinWeight = (weight: number) => {
    if (vegetableWeight > weight) {
      setVegetableWeight(vegetableWeight - 100);
    }
  }
  const handleAddItem = (data: Product, quantity: number) => {
    addItem(data, quantity)
  }


  return (
    <div>
      <Drawer placement='bottom' onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent className='h-[95%] rounded-t-3xl relative'>
          <DrawerBody className=' flex flex-col gap-6 justify-end'>
            <div className="relative w-full h-fit">
              <Image src={data.imageUrl} alt='' width={500} height={500} className='w-72 h-72 m-auto object-cover' />
              <div className="absolute left-0  bottom-0 bg-gray-100 px-1 py-10 rounded-r-2xl  -translate-x-7" onClick={handlePrevIndex} >
                <BiLeftArrow className='text-gray-400 size-10' />
              </div>
              <div className="absolute right-0 bottom-0 bg-gray-100 px-1 py-10 rounded-l-2xl  translate-x-7" onClick={handleNextIndex}>
                <BiRightArrow className='text-gray-400 size-10' />
              </div>
            </div>
            <>
            </><h1 className='text-3xl font-bold'>{data?.name}</h1>
            <h2 className='text-xl font-semibold'>In 100 grams</h2>
            <div className="grid grid-cols-4 justify-center border-2 p-2 rounded-3xl border-gray-200 items-center text-center">
              <div className="flex flex-col">
                <h3 className='text-lg font-bold'>{data?.metadata.calorie}</h3>
                <h4 className='text-gray-500 font-normal'>calorie</h4>
              </div>
              <div className="flex flex-col">
                <h3 className='text-lg font-bold'>{data?.metadata.proteins}</h3>
                <h4 className='text-gray-500 font-normal'>proteins</h4>
              </div>
              <div className="flex flex-col">
                <h3 className='text-lg font-bold'>{data?.metadata.fats}</h3>
                <h4 className='text-gray-500 font-normal'>fats</h4>
              </div>
              <div className="flex flex-col">
                <h3 className='text-lg font-bold'>{data?.metadata.carbs}</h3>
                <h4 className='text-gray-500 font-normal'>carbs</h4>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex  justify-between bg-gray-200 rounded-full  w-full p-3 items-center ">
                {product !== undefined ? <FaMinus onClick={() => handleMinusData(product.productId.id, product?.quantity)} /> : <FaMinus onClick={() => handleMinWeight(data?.weight)} />}
                <h4 className="font-bold text-xl">{product !== undefined ? product.quantity / 1000 : vegetableWeight / 1000}kg</h4 >
                {product !== undefined ? (
                  <FaPlus onClick={() => handlePlusData(product.productId.id, product?.quantity)} />
                ) : <FaPlus onClick={() => handleAddWeight()} />}

              </div>
              <div className="bg-gray-200 p-5  items-center justify-center rounded-full  ">
                <FaHeart />
              </div>
            </div>
            {product !== undefined ?
              (<div className="button flex justify-between py-4 px-10 bg-black rounded-full text-white font-bold" onClick={() => handleAddItem(data, product.quantity)}>
                <h5>To Cart</h5>
                <h5>${(data.price * product.quantity).toFixed(2)}</h5>
              </div>) :
              (<div className="button flex justify-between py-4 px-10 bg-black rounded-full text-white font-bold" onClick={() => handleAddItem(data, vegetableWeight)}>
                <h5>To Cart</h5>
                <h5>${(data.price * vegetableWeight).toFixed(2)}</h5>
              </div>)}

          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default VegetableCardDetail 
