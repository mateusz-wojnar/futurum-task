import { Prisma } from "../../generated/prisma/client";

export type ProductsWithCampaigns = Prisma.ProductGetPayload<{
  include: { campaigns: true };
}>;
