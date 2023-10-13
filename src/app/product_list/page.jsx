import Header from "@/components/Header";
import Listproduct from "@/components/Listproduct";
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";

export default async function page() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/product_list");
  }
  return (
    <div className="px-4 space-y-4 bg-gray-100 min-h-screen">
      {" "}

      <Header title={"Gestion des produits"}/>

      <Listproduct />
    </div>
  );
}
