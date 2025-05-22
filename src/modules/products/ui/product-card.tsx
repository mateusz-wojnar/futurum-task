"use client";

import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProductsWithCampaigns } from "@/modules/products/types";
import { CampaignDataTable } from "@/modules/campaigns/ui/campaign-data-table";
import { columns } from "@/modules/campaigns/ui/campaign-columns";
import { CampaignCreateDialog } from "@/modules/campaigns/ui/campaign-create-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProductCardProps {
  product: ProductsWithCampaigns;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const path = usePathname();

  return (
    <Card className="min-h-[100px] m-4 md:m-2">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>
            Created at: {format(product.createdAt, "dd MMMM yyy / k:m")}
          </CardDescription>
        </div>
        <div className="flex">
          {path !== `/products/${product.id}` && (
            <div className="mr-2">
              <Button asChild variant="link">
                <Link href={`/products/${product.id}`}>Show product</Link>
              </Button>
            </div>
          )}
          <CampaignCreateDialog
            productId={product.id}
            productName={product.name}
          />
        </div>
      </CardHeader>
      <CardContent>
        {product.campaigns?.length > 0 ? (
          <CampaignDataTable columns={columns} data={product.campaigns} />
        ) : (
          <p className="text-sm text-red-400">No campaigns found...</p>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default ProductCard;
