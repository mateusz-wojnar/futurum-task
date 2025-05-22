"use server";

import { prisma } from "@/lib/db";

// later to refine with error handling

export const getProductsWithCampaigns = async () => {
  const productsWithCampaigns = prisma.product.findMany({
    include: {
      campaigns: true,
    },
  });

  return productsWithCampaigns;
};

export const getSingleProductWithCampaigns = async (id: string) => {
  const productWithCampaign = prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      campaigns: true,
    },
  });

  return productWithCampaign!;
};
