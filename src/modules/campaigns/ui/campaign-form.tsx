"use client";

import { useRef, useState, useTransition } from "react";
import { Check, ChevronsUpDown, Gem, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Campaign, Town } from "@/generated/prisma";

import { updateCampaign } from "../server/actions";
import { KEYWORD_SUGGESTIONS, TOWN_DISPLAY_NAMES } from "../../constants";
import { CampaignFormSchema } from "../schemas";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface Props {
  campaign?: Campaign; // edit if present, otherwise create
  productId?: string; // only needed when creating
  onSubmit: (values: z.infer<typeof CampaignFormSchema>) => Promise<void>; // passed down handler
  onCancel?: () => void; //to close dialogs
}

export const CampaignForm = ({ campaign, onSubmit, onCancel }: Props) => {
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
  // const originalFund = useRef(form.getValues("campaignFund") ?? 0);
  const originalFund = useRef(campaign?.campaignFund ?? 0);
  //Calc net change
  const fundDelta = watchedFund - originalFund.current;

  const handleSubmit = async (values: z.infer<typeof CampaignFormSchema>) => {
    // mocked error, should probably be integrated to zod schema
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
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Keywords</FormLabel>
              {field.value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {field.value.map((val) => {
                    const label = KEYWORD_SUGGESTIONS.find(
                      (k) => k.value === val
                    )?.label;
                    return (
                      <div
                        key={val}
                        className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full text-sm"
                      >
                        <span>{label}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = field.value.filter(
                              (k) => k !== val
                            );
                            field.onChange(updated);
                          }}
                          className="text-muted-foreground hover:text-foreground transition"
                        >
                          <X className="h-3 w-3 cursor-pointer" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-[200px] justify-between"
                      disabled={isPending}
                    >
                      Add keyword...
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search keyword..." />
                    <CommandList>
                      <CommandEmpty>No keyword found.</CommandEmpty>
                      <CommandGroup>
                        {KEYWORD_SUGGESTIONS.map((keyword) => (
                          <CommandItem
                            value={keyword.label}
                            key={keyword.value}
                            onSelect={() => {
                              const currentValues = field.value || [];
                              if (currentValues.includes(keyword.value)) {
                                form.setValue(
                                  "keywords",
                                  currentValues.filter(
                                    (k) => k !== keyword.value
                                  )
                                );
                              } else {
                                form.setValue("keywords", [
                                  ...currentValues,
                                  keyword.value,
                                ]);
                              }
                            }}
                          >
                            {keyword.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value?.includes(keyword.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select maximum of 10 keywords to be associated with campaign
              </FormDescription>
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
                  placeholder=""
                  type="number"
                  {...field}
                  disabled={isPending}
                  max={emeraldBalance + form.getValues("campaignFund")}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    if (
                      value >
                      emeraldBalance + form.getValues("campaignFund")
                    ) {
                      form.setValue("campaignFund", emeraldBalance);
                    } else if (value < 0) {
                      form.setValue("campaignFund", 0);
                    }
                  }}
                />
              </FormControl>
              <FormDescription className="flex-col">
                <span className="flex items-center">
                  Current balance:
                  <Gem className="text-emerald-500 w-4 h-4 mx-1" />
                  {emeraldBalance}
                </span>
                <span className="flex items-center">
                  {fundDelta > 0 &&
                    field.value <= emeraldBalance + originalFund.current && (
                      <>
                        Balance after deduction:
                        <Gem className="text-emerald-500 w-4 h-5 mx-1" />
                        <span className="font-semibold text-red-400">
                          {emeraldBalance - fundDelta}
                        </span>
                      </>
                    )}
                  {fundDelta < 0 &&
                    field.value <= emeraldBalance + originalFund.current && (
                      <>
                        Balance after refund:
                        <Gem className="text-emerald-500 w-4 h-5 mx-1" />
                        <span className="font-semibold text-emerald-500">
                          {emeraldBalance - fundDelta}
                        </span>
                      </>
                    )}
                  {field.value > emeraldBalance + originalFund.current && (
                    <span className="text-red-500">Insufficient funds</span>
                  )}
                </span>
              </FormDescription>

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
        {/* <Button type="submit" disabled={isPending}>
          {campaign ? "Update" : "Create"}
        </Button> */}
      </form>
    </Form>
  );
};
