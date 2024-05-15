import { Product } from '@/types/product'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'


const VegetableData: React.FC<Product> = ({ imageUrl, price, weight, name }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [showBuy, setShowBuy] = useState(true)
  const handleButton = () => {
    setShowBuy(prevState => !prevState)
  }
  const handleError = () => {
    setImgSrc('/products/cucumber.png');
  };
  return (
    <div className="card bg-slate-100 px-3 py-[11px] flex flex-col">
      <div className="image-container flex justify-center mix-blend-multiply bg-transparant">
        <Image src={imgSrc} alt="" className='w-48 h-48 object-cover' width={500} height={500} onError={handleError} />

      </div>
      <h1 className='font-semibold text-[22px]'>${price * weight}</h1>
      <h2 className='flex flex-1'>{name}</h2>
      {showBuy ? (
        <div className="interact flex justify-between items-center">
          <h3 className='text-slate-500 text-md'>{weight / 1000} kg</h3>
          <div className="p-2 border-2 border-gray-200 rounded-full" onClick={handleButton}>
            <FaPlus className=' text-black' />
          </div>
        </div>
      ) : (
        <div className="interact flex justify-between items-center">
          <div className="p-4 border-2 bg-black border-gray-200 rounded-full">
            <FaMinus className=' text-white' />
          </div>
          <h3 className='text-black text-lg'>{weight / 1000} kg</h3>
          <div className="p-4 border-2 bg-black border-gray-200 rounded-full">
            <FaPlus className=' text-white' />
          </div>
        </div>
      )
      }
    </div>
  )
}

export default VegetableData