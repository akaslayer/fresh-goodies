'use client'
import { ReactNode, useEffect, useState } from "react"
import useVegetableList from "../hooks/useVegetableList"
import { VegetableContext } from "./vegetableContext"
import { Product } from "@/types/product"


// const getVegetableData = async (pokemonList: Pokemon[]) => {
//   JSON.stringify(pokemonList)
//   const mapDetails = await Promise.all(
//     pokemonList.map(async (pokemon) => {
//       try {
//         const response = await fetchPokemonDetails(pokemon.name)
//         return response
//       } catch (error) {
//         console.error(error)
//       }
//     })
//   )
//   return mapDetails
// }



const VegetableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { vegetableList } = useVegetableList()
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [productListByCategory, setProductListByCategory] = useState<Map<string, Product[]>>(new Map())
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const filterData = vegetableList.filter(item => item.category.includes(categoryFilter))

  const newVegetableMap = new Map<string, Product[]>();
  vegetableList.forEach(vegetable => {
    const categoryVegetables = newVegetableMap.get(vegetable.category) || [];
    newVegetableMap.set(vegetable.category, [...categoryVegetables, vegetable]);
  });

  useEffect(() => {
    setProductListByCategory(newVegetableMap)
  }, [productListByCategory])
  console.log(productListByCategory)

  useEffect(() => {
    const newList = new Set(vegetableList.map(item => item.category));
    setCategoryList(Array.from(newList))
  }, [productListByCategory])
  return (
    <VegetableContext.Provider value={{ vegetableList, categoryList, filterData, setCategoryFilter, categoryFilter, productListByCategory }}>
      {children}
    </VegetableContext.Provider>
  )
}

export default VegetableProvider