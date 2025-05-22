"use client";

import { useTransition, useState } from "react";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { deleteCampaign } from "../server/actions";
import { toast } from "sonner";

interface CampaignDeleteAlertProps {
  campaignId: string;
  campaignName: string;
  onDeleted?: () => void;
}

export const CampaignDeleteAlert = ({
  campaignId,
  campaignName,
}: CampaignDeleteAlertProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteCampaign(campaignId);
      if (res.success) {
        toast.success("Succesfully deleted campaign!");
        setOpen(false);
      } else {
        toast.error("Something went wrong!");
        setOpen(false);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <AlertDialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 hover:text-red-700"
              onClick={() => setOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete campaign</span>
            </Button>
          </TooltipTrigger>
        </AlertDialogTrigger>
        <TooltipContent>Delete campaign</TooltipContent>
      </Tooltip>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong>{campaignName}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
