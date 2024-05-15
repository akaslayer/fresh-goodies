import React, { useState } from 'react'

const CategoryBar = () => {

  return (
    <div className='flex px-4 gap-[40px] text-[18px] overflow-x-scroll no-scrollbar items-center '>
      <div className="p-[10px]">
        <h1>All</h1>
      </div>
      <div className="p-[10px]">
        <h1>Spicy</h1>
      </div>
      <div className="p-[10px]">
        <h1>Dressings</h1>
      </div>
      <div className="p-[10px]">
        <h1>Sweet</h1>
      </div>
      <div className="p-[10px]">
        <h1>Roots</h1>
      </div>
    </div>
  )
}

export default CategoryBar