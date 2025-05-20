import { prisma } from "@/lib/db";
import ProductCard from "./product_components/product-card";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="flex items-center justify-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
