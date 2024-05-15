import Image from "next/image"
import filter from '@/public/Filter.png'
import searchIcon from '@/public/search.png'


const NavBar = () => {
  return (
    <nav className="fixed w-full h-auto top-0 flex justify-between items-center px-4 py-8 z-50 bg-white">
      <h1 className="text-xl font-semibold">Vegetables</h1>
      <ul className="flex items-center gap-12">
        <li><Image src={filter} alt="filter" className="w-5" /></li>
        <li><Image src={searchIcon} alt="filter" className="w-5" /></li>
      </ul>
    </nav>
  )
}

export default NavBar