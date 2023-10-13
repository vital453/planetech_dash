import React from "react";
import Material, { Button } from "@/components/Material";
import Header from "@/components/Header";
import Topcard from "@/components/Topcard";
import Barchart from "@/components/Barchart";
import RecentOrder from "@/components/RecentOrder";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function page() {
  const session = await getServerSession(options);

  console.log(session,"sesion google");
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <>
      <div className="bg-gray-100 min-h-screen px-4">
        <Header title={"Tableau de Board"} user={session?.user} />
        <Topcard />
        {/* <Barchart /> */}
        <RecentOrder />
      </div>
    </>
  );
}
