import { useState } from "react";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { CampaignForm } from "./campaign-form";
import { CampaignFormSchema } from "../schemas";
import { createCampaign } from "../server/actions";
import { toast } from "sonner";

interface Props {
  productId: string;
  productName: string;
}

export const CampaignCreateDialog = ({ productId, productName }: Props) => {
  const [open, setOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof CampaignFormSchema>) => {
    const res = await createCampaign(productId, values);

    if (res.success) {
      toast.success("Succesfully created campaign!");
      setOpen(false);
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} className="w-full md:w-fit">
        Add campaign
      </Button>

      <DialogContent className="max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>New Campaign</DialogTitle>
          <DialogDescription>
            Create a campaign for: {productName}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto px-1 mt-4 flex-1">
          <CampaignForm productId={productId} onSubmit={onSubmit} />
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
