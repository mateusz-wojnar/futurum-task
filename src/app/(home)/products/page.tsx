import ProductCard from "@/modules/products/ui/product-card";
import { getProductsWithCampaigns } from "@/modules/products/server/actions";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
  const products = await getProductsWithCampaigns();
  return (
    <section className="max-w-7xl w-full flex flex-col mx-auto items-center mt-5">
      <header className="flex justify-center lg:text-4xl md:text-2xl text-xl mb-5">
        Viewing all products ({products ? products.length : 0})
      </header>
      <div className="flex items-center text-sm mb-3">
        <Button variant="link">
          <Link href="/campaigns">
            {" "}
            If you want to see combined campaigns, go to campaigns
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
