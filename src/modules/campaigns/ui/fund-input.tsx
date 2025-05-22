import { RefObject } from "react";
import { UseFormReturn } from "react-hook-form";
import { Gem } from "lucide-react";
import { z } from "zod";

import { CampaignFormSchema } from "../schemas";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CampaignFundInputProps {
  form: UseFormReturn<z.infer<typeof CampaignFormSchema>>;
  emeraldBalance: number;
  originalFund: RefObject<number>;
  fundDelta: number;
  isPending?: boolean;
}

export const CampaignFundInput = ({
  form,
  emeraldBalance,
  originalFund,
  fundDelta,
  isPending,
}: CampaignFundInputProps) => {
  return (
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
                const maxAllowed =
                  emeraldBalance + form.getValues("campaignFund");

                if (value > maxAllowed) {
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
                field.value <= emeraldBalance + originalFund.current &&
                field.value > 0 && (
                  <>
                    Balance after deduction:
                    <Gem className="text-emerald-500 w-4 h-5 mx-1" />
                    <span className="font-semibold text-red-400">
                      {emeraldBalance - fundDelta}
                    </span>
                  </>
                )}
              {fundDelta < 0 &&
                field.value <= emeraldBalance + originalFund.current &&
                field.value > 0 && (
                  <>
                    Balance after refund:
                    <Gem className="text-emerald-500 w-4 h-5 mx-1" />
                    <span className="font-semibold text-emerald-500">
                      {emeraldBalance - fundDelta}
                    </span>
                  </>
                )}
              {field.value > emeraldBalance + originalFund.current &&
                field.value > 0 && (
                  <span className="text-red-500">Insufficient funds</span>
                )}
              {field.value < 0 && (
                <span className="text-red-500">Invalid number</span>
              )}
            </span>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
