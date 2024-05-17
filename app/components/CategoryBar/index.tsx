"use client"
import { useVegetableContext } from '@/app/context/vegetableContext';
import React, { useContext, useState } from 'react'

const CategoryBar = () => {
  const { categoryList, setCategoryFilter, categoryFilter } = useVegetableContext();
  const handleData = (data: string) => {
    setCategoryFilter(data)
  }
  return (
    <div className='flex px-4 gap-[40px] text-[18px] overflow-x-scroll no-scrollbar items-center '>
      <div className={`p-[10px] ${categoryFilter == '' ? 'border-b-2 border-black' : ''}`} onClick={() => handleData('')} >
        <h1>All</h1>
      </div>
      {categoryList.map((data, index) => (
        <div key={index} className={`p-[10px] ${categoryFilter == data ? 'border-b-2 border-black' : ''}`} onClick={() => handleData(data)} >
          <h1>{data}</h1>
        </div>
      ))}
    </div>
  )
}

export default CategoryBar