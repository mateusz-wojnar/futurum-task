import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 grid-cols-1 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <span className="items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                New Feature
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl">
                Create powerful campaigns that{" "}
                <span className="text-emerald-500">convert</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                Launch, manage, and analyze your marketing campaigns all in one
                place. Our intuitive platform makes it easy to create campaigns
                that drive results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-emerald-500 hover:text-black"
              >
                <Link href="/products" className="flex items-center ">
                  Create Campaign <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
