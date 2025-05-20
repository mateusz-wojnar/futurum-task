import { format } from "date-fns";
import { Product } from "@/generated/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="min-h-[100px] min-w-[300px]">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          Created at: {format(product.createdAt, "dd MMMM yyy / k:m")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Campaigns</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
