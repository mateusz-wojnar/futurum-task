"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Campaign, Town } from "@/generated/prisma";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CampaignEditFormSchema = z.object({
  name: z.string().min(3).max(50),
  keywords: z.array(z.string().min(1).max(20)).min(1).max(10),
  bidAmount: z.number().min(1).max(100000),
  campaignFund: z.number().min(1).max(100000),
  status: z.boolean(),
  town: z.enum([
    Town.BYDGOSZCZ as "Bydgoszcz",
    Town.KATOWICE,
    Town.KRAKOW,
    Town.WARSZAWA,
    Town.WROCLAW,
  ]),
  radius: z.number().min(0).max(10000),
});

interface Props {
  campaign: Campaign;
}

export const CampaignEditForm = ({ campaign }: Props) => {
  const form = useForm<z.infer<typeof CampaignEditFormSchema>>({
    resolver: zodResolver(CampaignEditFormSchema),
    defaultValues: {
      name: "",
      keywords: [""],
      bidAmount: 0,
      campaignFund: 0,
      status: false,
      town: "Bydgoszcz",
      radius: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof CampaignEditFormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>The name of the campaign</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <Input placeholder="Keywords" {...field} />
              </FormControl>
              <FormDescription>Keywords for the campaign</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
