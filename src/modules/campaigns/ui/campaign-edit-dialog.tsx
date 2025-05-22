import { useState } from "react";
import { z } from "zod";
import { MoreHorizontal } from "lucide-react";

import { Campaign } from "@/generated/prisma";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { CampaignForm } from "./campaign-form";
import { updateCampaign } from "../server/actions";
import { CampaignFormSchema } from "../schemas";

interface Props {
  campaign: Campaign;
}

export const CampaignEditDialog = ({ campaign }: Props) => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof CampaignFormSchema>) => {
    const res = await updateCampaign(campaign.id, values);

    if (res.success) {
      console.log("Campaign updated!");
      setOpen(false);
    } else {
      console.error(res.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-lg font-medium">
            Actions
          </DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <span>Edit</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit campaign</DialogTitle>
          <DialogDescription>
            Currently editing: {campaign.name}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto px-1 mt-4 flex-1">
          <CampaignForm
            campaign={campaign}
            onSubmit={onSubmit}
            onCancel={() => setOpen(false)}
          />
        </div>
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="default" type="submit" form="campaign-form">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
