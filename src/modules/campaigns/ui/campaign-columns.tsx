"use client";

import { Campaign, Town } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";

import { CampaignEditDialog } from "./campaign-edit-dialog";
import { TOWN_DISPLAY_NAMES } from "@/modules/constants";
import { CampaignDeleteAlert } from "./campaign-delete-alert";
import { DataTableColumnHeader } from "./campaign-data-table-column";

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "keywords",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keywords" />
    ),
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
    header: ({ column }) => (
      <div className="">
        <DataTableColumnHeader column={column} title="Bid amount" />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("bidAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "campaignFund",
    header: ({ column }) => (
      <div className="">
        <DataTableColumnHeader column={column} title="Fund" />
      </div>
    ),
    cell: ({ row }) => {
      const fund = parseFloat(row.getValue("campaignFund"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(fund);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Town" />
    ),
    cell: ({ row }) => {
      const rawValue = row.getValue("town") as Town;
      return TOWN_DISPLAY_NAMES[rawValue] ?? rawValue;
    },
  },
  {
    accessorKey: "radius",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Radius" />
    ),
    cell: ({ row }) => {
      const rawValue = row.getValue("radius");
      return `${rawValue} km`;
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
