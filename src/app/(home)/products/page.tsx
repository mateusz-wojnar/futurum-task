import Link from "next/link";

import ProductCard from "@/modules/products/ui/product-card";

import { Button } from "@/components/ui/button";
import { getProductsWithCampaigns } from "@/modules/products/server/actions";

const Page = async () => {
  const products = await getProductsWithCampaigns();
  return (
    <section className="container w-full flex flex-col mx-auto items-center mt-5">
      <header className="flex justify-center lg:text-4xl md:text-2xl text-xl mb-5">
        Viewing all products ({products ? products.length : 0})
      </header>
      <div className="flex items-center text-sm mb-3">
        <Button variant="link">
          <Link href="/campaigns">
            {" "}
            Go to combined campaigns
          </Link>
        </Button>
      </div>
      <div className="flex flex-col justify-center gap-2 w-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Page;
