"use client";

import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Campaign, Town } from "@/generated/prisma";

import { TOWN_DISPLAY_NAMES } from "../../constants";
import { CampaignFormSchema } from "../schemas";

import { KeywordSelector } from "./keyword-selector";
import { CampaignFundInput } from "./fund-input";

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

interface Props {
  campaign?: Campaign; // edit if present, otherwise create
  productId?: string; // only needed when creating
  onSubmit: (values: z.infer<typeof CampaignFormSchema>) => Promise<void>; // passed down handler
  onCancel?: () => void; //to close dialogs
}

export const CampaignForm = ({ campaign, onSubmit}: Props) => {
  const [isPending, startTransition] = useTransition();

  // Mocked emerald funds, only in state and fetched/updated to localStorage
  const [emeraldBalance, setEmeraldBalance] = useState<number>(() => {
    const stored = localStorage.getItem("emeraldBalance");
    return stored ? parseInt(stored, 10) : 25000;
  });

  const form = useForm<z.infer<typeof CampaignFormSchema>>({
    resolver: zodResolver(CampaignFormSchema),
    defaultValues: {
      name: campaign?.name ?? "",
      keywords: campaign?.keywords ?? [],
      bidAmount: campaign?.bidAmount ?? 0,
      campaignFund: campaign?.campaignFund ?? 0,
      status: campaign?.status ?? false,
      town: campaign?.town ?? "KRAKOW",
      radius: campaign?.radius ?? 0,
    },
  });

  const watch = form.watch;
  const watchedFund = watch("campaignFund") ?? 0;
  const originalFund = useRef(campaign?.campaignFund ?? 0);
  //Calc net change
  const fundDelta = watchedFund - originalFund.current;

  const handleSubmit = async (values: z.infer<typeof CampaignFormSchema>) => {
    // mocked error, should probably be integrated to zod schema later in time
    if (values.campaignFund > emeraldBalance) {
      form.setError("campaignFund", {
        message: "Fund exceeds your balance!",
      });
      return;
    }

    startTransition(() => {
      try {
        onSubmit(values);
      } catch (err) {
        console.error(err, "Something went wrong");
        return;
      }

      const delta = values.campaignFund - originalFund.current;

      if (delta !== 0) {
        setEmeraldBalance((prev) => {
          const newBalance = prev - delta;
          localStorage.setItem("emeraldBalance", newBalance.toString());
          return newBalance;
        });
      }
    });
  };

  form.getValues("campaignFund");
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        id="campaign-form"
        className="space-y-8"
      >
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
        <KeywordSelector form={form} isPending={isPending} />
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
        <CampaignFundInput
          form={form}
          emeraldBalance={emeraldBalance}
          originalFund={originalFund}
          fundDelta={fundDelta}
          isPending={isPending}
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
      </form>
    </Form>
  );
};
