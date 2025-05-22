import { z } from "zod";

export const CampaignFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name should be minimum 3 characters long")
    .max(50, "Name should maximum 50 characters long"),
  keywords: z
    .array(
      z
        .string()
        .min(1, "Keyword should be minimum 1 character long")
        .max(20, "Keyword should maximum 20 characters long")
    )
    .max(10),
  bidAmount: z.coerce
    .number()
    .min(1, "Bid amount value should be minimum 1")
    .max(100000, "Bid amount value should be maximum 100000"),
  campaignFund: z.coerce
    .number()
    .min(1, "Fund value should be minimum 1")
    .max(100000, "Fund value should be maximum 100000"),
  status: z.boolean(),
  town: z.string(),
  radius: z.coerce
    .number()
    .min(0, "Radius cannot be negative")
    .max(10000, "Radius value should be maximum 10000"),
});
