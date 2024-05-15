'use client'
import { useVegetableContext } from '@/app/context/vegetableContext'
import cucumber from '@/public/cucumber.png'
import Image from 'next/image'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const CardVegetable = () => {
  const [showBuy, setShowBuy] = useState(true)
  const { vegetableList } = useVegetableContext()
  return (
    <div className='py-5 px-4'>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {vegetableList.map((data) => (
          <div className="card bg-slate-100 px-3 py-[11px]">
            <div className="image-container flex justify-center mix-blend-multiply bg-transparant">
              <Image src={data.imageUrl} alt="" className='' width={500} height={500} />
            </div>
            <h1 className='font-semibold text-[22px]'>${data.price}</h1>
            <h2>{data.name}</h2>
            {showBuy ? (
              <div className="interact flex justify-between items-center">
                <h3 className='text-slate-500 text-md'>{data.weight}</h3>
                <div className="p-2 border-2 border-gray-200 rounded-full">
                  <FaPlus className=' text-black' />
                </div>
              </div>
            ) : (
              <div className="interact flex justify-between items-center">
                <div className="p-4 border-2 bg-black border-gray-200 rounded-full">
                  <FaPlus className=' text-white' />
                </div>
                <h3 className='text-black text-lg'>{data.weight}</h3>
                <div className="p-4 border-2 bg-black border-gray-200 rounded-full">
                  <FaPlus className=' text-white' />
                </div>
              </div>
            )
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardVegetable