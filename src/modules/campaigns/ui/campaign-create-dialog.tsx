import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CampaignEditForm } from "./campaign-edit-form";

interface Props {
  productId: string;
  productName: string;
}

export const CampaignCreateDialog = ({ productId, productName }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Add campaign</Button>

      <DialogContent className="max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>New Campaign</DialogTitle>
          <DialogDescription>
            Create a campaign for: {productName}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto px-1 mt-4 flex-1">
          <CampaignEditForm
            productId={productId}
            closeDialog={() => setOpen(false)}
          />
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {/* You can put a submit button here if your form supports submit externally */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
