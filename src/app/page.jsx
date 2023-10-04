import React from "react";
import Material, { Button } from "@/components/Material";
import Header from "@/components/Header";
import Topcard from "@/components/Topcard";
import Barchart from "@/components/Barchart";
import RecentOrder from "@/components/RecentOrder";

export default function page() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen px-4">
        <Header title={"Tableau de Board"}/>
        <Topcard />
        {/* <Barchart /> */}
        <RecentOrder />
      </div>
    </>
  );
}
