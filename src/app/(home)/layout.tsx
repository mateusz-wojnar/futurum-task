import Navbar from "@/modules/home/ui/navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <div className="flex-1 bg-[#f2fffc]">
            {children}
        </div>
    </div>
  )
};

export default Layout;
