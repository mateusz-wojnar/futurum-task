"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Campaign, Town } from "@/generated/prisma";

import { TOWN_DISPLAY_NAMES } from "../../constants";
import { CampaignEditFormSchema } from "../schemas";

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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateCampaign } from "../server/actions";
import { useTransition } from "react";

interface Props {
  campaign: Campaign;
  closeDialog: () => void;
}

export const CampaignEditForm = ({ campaign, closeDialog }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CampaignEditFormSchema>>({
    resolver: zodResolver(CampaignEditFormSchema),
    defaultValues: {
      name: campaign.name,
      keywords: campaign.keywords,
      bidAmount: campaign.bidAmount,
      campaignFund: campaign.campaignFund,
      status: campaign.status,
      town: campaign.town,
      radius: campaign.radius,
    },
  });

  const onSubmit = async (values: z.infer<typeof CampaignEditFormSchema>) => {
    startTransition(async () => {
      const res = await updateCampaign(campaign.id, values);

      if (res.success) {
        console.log("Campaign updated!");
        closeDialog();
      } else {
        console.error(res.error);
      }
    });
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
                <Input placeholder="Name" {...field} disabled={isPending} />
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
                <Input placeholder="Keywords" {...field} disabled={isPending} />
              </FormControl>
              <FormDescription>Keywords for the campaign</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bidAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bid amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  type="number"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>Bidding amount</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="campaignFund"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign fund</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  type="number"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>Campaign funding budget</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>Is the campaign on ?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="radius"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Radius (in km)</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  type="number"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>
                Radius of the campaign in kilometers
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="town"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Town</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select town" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Town).map((town) => (
                    <SelectItem key={town} value={town}>
                      {TOWN_DISPLAY_NAMES[town]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Campaign primary town</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
