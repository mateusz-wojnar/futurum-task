"use server";

import { prisma } from "@/lib/db";

export const getProductsWithCampaigns = async () => {
  const productsWithCampaigns = prisma.product.findMany({
    include: {
      campaigns: true,
    },
  });

  return productsWithCampaigns;
};
