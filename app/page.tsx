import Image from "next/image";
import CategoryBar from "./components/CategoryBar";
import CardVegetable from "./components/CardVegetable";

export default function Home() {
  return (
    <div className="mt-20">
      <CategoryBar />
      <CardVegetable />
    </div>
  );
}
