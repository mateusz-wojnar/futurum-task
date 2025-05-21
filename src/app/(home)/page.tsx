import { prisma } from "@/lib/db";
import ProductCard from "../../modules/products/ui/product-card";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div>
      <p>Home</p>
    </div>
  );
}
