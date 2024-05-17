'use client'
import { ReactNode, useEffect, useState } from "react"
import useVegetableList from "../hooks/useVegetableList"
import { VegetableContext } from "./vegetableContext"
import { Product } from "@/types/product"
import { useDisclosure } from "@chakra-ui/react"



const VegetableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { vegetableList } = useVegetableList()
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [drawerIndex, setDrawerIndex] = useState<number>(0)
  const [productListByCategory, setProductListByCategory] = useState<Map<string, Product[]>>(new Map())
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const filterData = vegetableList.filter(item => item.category.includes(categoryFilter))
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    const newVegetableMap = new Map<string, Product[]>();

    vegetableList.forEach(vegetable => {
      const categoryVegetables = newVegetableMap.get(vegetable.category) || [];
      newVegetableMap.set(vegetable.category, [...categoryVegetables, vegetable]);
    });

    setProductListByCategory(newVegetableMap);
  }, [vegetableList]);




  useEffect(() => {
    const newList = new Set(vegetableList.map(item => item.category));
    setCategoryList(Array.from(newList));
  }, [vegetableList]);
  return (
    <VegetableContext.Provider value={{ vegetableList, categoryList, filterData, setCategoryFilter, categoryFilter, productListByCategory, drawerIndex, setDrawerIndex, isOpen, onClose, onOpen }}>
      {children}
    </VegetableContext.Provider>
  )
}

export default VegetableProvider