import { Button } from "@/components/ui/button";
import { getAllCampaigns } from "@/modules/campaigns/server/actions";
import { columns } from "@/modules/campaigns/ui/campaign-columns";
import { CampaignDataTable } from "@/modules/campaigns/ui/campaign-data-table";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const campaigns = await getAllCampaigns();

  return (
    <section className="max-w-7xl w-full flex flex-col mx-auto items-center mt-5">
      <header className="flex justify-center lg:text-4xl md:text-2xl text-xl mb-5">
        Viewing all campaigns ({campaigns.data?.length})
      </header>
      <div className="flex items-center text-sm">
        <Button variant="link">
          <Link href="/products"> If you want to create a campaign, go to products</Link>
        </Button>
      </div>
      <div className="flex flex-col justify-center gap-2 w-full">
        <CampaignDataTable columns={columns} data={campaigns.data!} />
      </div>
    </section>
  );
};

export default Page;
