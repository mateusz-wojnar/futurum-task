import Link from "next/link";

import { Button } from "@/components/ui/button";
import { columns } from "@/modules/campaigns/ui/campaign-columns";
import { CampaignDataTable } from "@/modules/campaigns/ui/campaign-data-table";
import { getAllCampaigns } from "@/modules/campaigns/server/actions";

const Page = async () => {
  const campaigns = await getAllCampaigns();

  return (
    <section className="container w-full flex flex-col mx-auto items-center mt-5 p-4">
      <header className="flex justify-center lg:text-4xl md:text-2xl text-xl mb-5">
        Viewing all campaigns ({campaigns.data?.length})
      </header>
      <div className="flex items-center text-sm">
        <Button asChild variant="link">
          <Link href="/products">
            {" "}
            If you want to create a campaign, go to products
          </Link>
        </Button>
      </div>
      <div className="flex flex-col justify-center gap-2 w-full">
        <CampaignDataTable columns={columns} data={campaigns.data!} />
      </div>
    </section>
  );
};

export default Page;
