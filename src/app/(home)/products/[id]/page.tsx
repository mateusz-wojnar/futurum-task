import Link from "next/link";

import ProductCard from "@/modules/products/ui/product-card";

import { Button } from "@/components/ui/button";
import { getSingleProductWithCampaigns } from "@/modules/products/server/actions";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const product = await getSingleProductWithCampaigns(id);

  return (
    <>
      {product ? (
        <section className="container w-full flex flex-col mx-auto items-center mt-5">
          <header className="flex justify-center lg:text-4xl md:text-2xl text-xl mb-5">
            {product.name} has{" "}
            {product.campaigns.length === 1
              ? `${product.campaigns.length} campaign`
              : `${product.campaigns.length} campaigns`}
          </header>
          <div className="flex items-center text-sm">
            <Button asChild variant="link">
              <Link href="/products"> Go back to products</Link>
            </Button>
          </div>
          <div className="flex flex-col justify-center gap-2 w-full">
            <ProductCard product={product} />
          </div>
        </section>
      ) : (
        <section className=" flex flex-col h-[30vh]  items-center justify-center">
          <h1 className="lg:text-4xl md:text-2xl text-xl mb-5 font-semibold">
            No product found!
          </h1>
          <Button variant="link">
            <Link href="/products" className="underline">
              Go back to products
            </Link>
          </Button>
        </section>
      )}
    </>
  );
};

export default Page;
