import Image from "next/image";
import CategoryBar from "./components/CategoryBar";
import CardVegetable from "./components/CardVegetable";
import DrawerVegetable from "./components/Drawer";
import VegetableCardDetail from "./components/CardVegetable/component/VegetableData/component/VegetableTableCard";

export default function Home() {
  return (
    <div className="mt-20 overflow-hidden relative">
      <CategoryBar />
      <CardVegetable />
      <DrawerVegetable />
      <VegetableCardDetail />
    </div>
  );
}
