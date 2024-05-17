'use client'
import { useCartContext } from '@/app/context/cartContext';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure
} from '@chakra-ui/react';
import Image from 'next/image';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import { HiXCircle } from 'react-icons/hi';


const DrawerVegetable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items, getTotalPrice, updateItemQuantity } = useCartContext()
  const handleMinusData = (id: number, qty: number) => {
    const quantity = qty - 100
    updateItemQuantity(id, quantity)
  }

  const handlePlusData = (id: number, qty: number) => {
    const quantity = qty + 100
    updateItemQuantity(id, quantity)
  }

  return (
    <div>
      <div className="fixed bottom-8 w-full p-4 text-left z-10">
        <button className='flex px-8 w-full text-left py-3 bg-black rounded-full text-white font-bold gap-8 items-center justify-between ' onClick={onOpen}>
          <div className="flex gap-5">
            <h1>Cart</h1>
            <div className="flex">
              {items.map((data, index) => (
                <Image key={index} src={data.productId.imageUrl} width={60} height={40} alt='' className=' rounded-full w-6 h-6' />
              ))}
            </div>
          </div>
          <h2>${getTotalPrice().toFixed(2)}</h2>
        </button>
      </div>
      <div className="h-full">
        <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent className='h-full  relative'>
            <DrawerBody className=' flex flex-col gap-6 p-20'>
              <HiXCircle size={60} onClick={onClose} />
              <h1 className='font-bold text-4xl'>Cart</h1>
              <div className="flex items-center gap-8">
                <Image src={'/cart.png'} width={80} height={40} alt='' className='basis-1/3' />
                <div className="flex flex-col gap-4 basis-2/3">
                  <h2 className='font-normal'>Before free shipping <strong>${getTotalPrice() < 15 ? (15 - getTotalPrice()).toFixed(2) : 0}</strong></h2>
                  <div className=' p-1 bg-green-500' style={{ width: `${100 - ((15 - getTotalPrice()) / 15 * 100)}%` }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-3 item flex-1">
                {items.map((data, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center">
                    <Image src={data.productId.imageUrl} width={20} height={20} alt='' className='w-full h-full' />
                    <div className="flex flex-col gap-4 col-span-2 text-center">
                      <h3 className='font-bold text-xl'>{data.productId.name}</h3>
                      <div className="flex gap-3 justify-center items-center">
                        <BiMinusCircle size={30} onClick={() => handleMinusData(data.productId.id, data.quantity)} />
                        <h3>{data.quantity / 1000} kg</h3>
                        <BiPlusCircle size={30} onClick={() => handlePlusData(data.productId.id, data.quantity)} />
                      </div>
                    </div>
                    <h4 className='basis-1/4 items-end text-gray-400'>${(data.quantity * data.productId.price).toFixed(2)}</h4>
                  </div>
                ))}
              </div>
              <div className="button flex justify-between py-4 px-10 bg-black rounded-full text-white font-bold">
                <h5>Check Out</h5>
                <h5>${getTotalPrice().toFixed(2)}</h5>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}

export default DrawerVegetable