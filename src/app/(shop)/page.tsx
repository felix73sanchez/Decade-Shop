import { ProductGrid, Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import Image from "next/image";


const products = initialData.products;



export default function Home() {
  return (
    <>
      <Title
        title="Tienda"
        subtitle="Bienvenido a la tienda"
        className="mb-2 text-7xl"
      />
      <ProductGrid
        products={products}
      />

    </>
  );
}
