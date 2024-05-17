'use client'
import { useVegetableContext } from '@/app/context/vegetableContext'
import { useState } from 'react'
import VegetableData from './component/VegetableData'



const CardVegetable = () => {
  const [showBuy, setShowBuy] = useState(true)
  const { categoryFilter, filterData, productListByCategory, categoryList } = useVegetableContext()
  const handleButton = () => {
    setShowBuy(prevState => !prevState)
  }
  return (
    <div className='py-5 px-4'>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {filterData.map((data, index) => (
          <VegetableData key={index} {...data} />
        ))}
      </div>
      {categoryFilter == "" && (
        categoryList.map(categoryValue => (
          <>
            <div className="py-5">
              <h2 className='font-bold text-2xl'>{categoryValue}</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {productListByCategory.get(categoryValue)?.map((data, index) => (
                  <VegetableData key={index}  {...data} />
                ))}
              </div>
            </div>
          </>
        ))
      )}

    </div>
  )
}

export default CardVegetable