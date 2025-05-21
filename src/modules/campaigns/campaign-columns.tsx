"use client";

import { Campaign } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";

const TOWN_DISPLAY_NAMES: Record<string, string> = {
  KRAKOW: "Kraków",
  WARSZAWA: "Warszawa",
  KATOWICE: "Katowice",
  WROCLAW: "Wrocław",
  BYDGOSZCZ: "Bydgoszcz",
};

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "keywords",
    header: "Keywords",
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
    header: "Town",
    cell: ({ row }) => {
      const rawValue = row.getValue("town") as string;
      return TOWN_DISPLAY_NAMES[rawValue] || rawValue;
    },
  },
];
