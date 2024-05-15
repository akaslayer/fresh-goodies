'use client'
import { ReactNode } from "react"
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
  return (
    <VegetableContext.Provider value={{ vegetableList }}>
      {children}
    </VegetableContext.Provider>
  )
}

export default VegetableProvider