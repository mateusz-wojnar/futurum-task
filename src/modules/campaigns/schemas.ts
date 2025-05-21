import { z } from "zod";

export const CampaignFormSchema = z.object({
  name: z.string().min(3).max(50),
  keywords: z.array(z.string().min(1).max(20)).min(1).max(10),
  bidAmount: z.coerce.number().min(1).max(100000),
  campaignFund: z.coerce.number().min(1).max(100000),
  status: z.boolean(),
  town: z.string(),
  radius: z.coerce.number().min(0).max(10000),
});
