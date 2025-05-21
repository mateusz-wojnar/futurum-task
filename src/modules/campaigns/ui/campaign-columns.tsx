"use client";

import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Campaign, Town } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CampaignEditDialog } from "./campaign-edit-dialog";
import { TOWN_DISPLAY_NAMES } from "@/modules/constants";
import { CampaignDeleteAlert } from "./campaign-delete-alert";

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "keywords",
    header: "Keywords",
    cell: ({ row }) => {
      const keywords = row.getValue("keywords") as string[];
      const preview = keywords.slice(0, 2).join(", ");
      const full = keywords.join(", ");

      return (
        <span title={full}>
          {keywords.length > 2 ? `${preview},...` : preview}
        </span>
      );
    },
  },
  {
    accessorKey: "bidAmount",
    header: () => <div className="text-right">Bid amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("bidAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "campaignFund",
    header: () => <div className="text-right">Campaign fund</div>,
    cell: ({ row }) => {
      const fund = parseFloat(row.getValue("campaignFund"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(fund);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return status ? (
        <p className="text-emerald-500">On</p>
      ) : (
        <p className="text-muted-foreground">Off</p>
      );
    },
  },
  {
    accessorKey: "town",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Town
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rawValue = row.getValue("town") as Town;
      return TOWN_DISPLAY_NAMES[rawValue] ?? rawValue;
    },
  },

  //Adding actions definitions
  {
    id: "actions",
    cell: ({ row }) => {
      const campaign = row.original;

      return (
        <>
          <CampaignEditDialog campaign={campaign} />
          <CampaignDeleteAlert
            campaignId={campaign.id}
            campaignName={campaign.name}
          />
        </>
      );
    },
  },
];
