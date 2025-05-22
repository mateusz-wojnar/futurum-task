import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { KEYWORD_SUGGESTIONS } from "../../constants";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { CampaignFormSchema } from "../schemas";

interface KeywordSelectorProps {
  form: UseFormReturn<z.infer<typeof CampaignFormSchema>>;
  isPending?: boolean;
}

export const KeywordSelector = ({ form, isPending }: KeywordSelectorProps) => {
  return (
    <FormField
      control={form.control}
      name="keywords"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Keywords</FormLabel>
          {field.value.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {field.value.map((val: string) => {
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
                          (k: string) => k !== val
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
                                (k: string) => k !== keyword.value
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
  );
};
