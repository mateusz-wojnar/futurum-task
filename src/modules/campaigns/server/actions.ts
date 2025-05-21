"use server";

import { z } from "zod";
import { CampaignFormSchema } from "../schemas";
import { prisma } from "@/lib/db";
import { Town } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export const updateCampaign = async (
  id: string,
  values: z.infer<typeof CampaignFormSchema>
) => {
  const validatedData = CampaignFormSchema.safeParse(values);

  if (!validatedData.success) {
    return {
      error: "Validation failed",
      details: validatedData.error.format(),
    };
  }

  const { name, keywords, bidAmount, campaignFund, status, town, radius } =
    validatedData.data;

  try {
    await prisma.campaign.update({
      where: { id },
      data: {
        name,
        keywords,
        bidAmount,
        campaignFund,
        status,
        town: town as Town,
        radius,
      },
    });

    revalidatePath("/products");
    revalidatePath("/campaigns");

    return {
      success: "Successfully updated campaign",
    };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update campaign" };
  }
};

export const createCampaign = async (
  productId: string,
  values: z.infer<typeof CampaignFormSchema>
) => {
  const validatedData = CampaignFormSchema.safeParse(values);

  if (!validatedData.success) {
    return {
      error: "Validation failed",
      details: validatedData.error.format(),
    };
  }

  const { name, keywords, bidAmount, campaignFund, status, town, radius } =
    validatedData.data;

  try {
    await prisma.campaign.create({
      data: {
        name,
        keywords,
        bidAmount,
        campaignFund,
        status,
        town: town as Town,
        radius,
        product: {
          connect: { id: productId },
        },
      },
    });

    revalidatePath("/products");
    revalidatePath("/campaigns");

    return {
      success: "Successfully created campaign",
    };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create campaign" };
  }
};


export const deleteCampaign = async (id: string) => {
  if (!id) return {error: "No campaign provided"}

  try {
    await prisma.campaign.delete({
      where: {
        id 
      }
    })
  } catch (error) {
    console.error(error)
    return {error: "Failed to delete campaign."}
  }
}