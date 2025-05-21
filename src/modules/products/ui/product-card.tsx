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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ProductsWithCampaigns } from "@/modules/products/types";
import { CampaignDataTable } from "@/modules/campaigns/ui/campaign-data-table";
import { columns } from "@/modules/campaigns/ui/campaign-columns";

interface ProductCardProps {
  product: ProductsWithCampaigns;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  return (
    <Card className="min-h-[100px] min-w-full m-4 md:m-2">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          Created at: {format(product.createdAt, "dd MMMM yyy / k:m")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {product.campaigns.length > 0 ? (
          <CampaignDataTable columns={columns} data={product.campaigns} />
        ) : (
          <p className="text-sm text-red-400">No campaigns found...</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push(`/products/${product.id}`)}>
          Show product
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
