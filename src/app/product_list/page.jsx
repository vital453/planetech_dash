import Header from "@/components/Header";
import Listproduct from "@/components/Listproduct";
import React from "react";

export default function page() {
  return (
    <div className="px-4 space-y-4 bg-gray-100 min-h-screen">
      {" "}

      <Header title={"Gestion des produits"}/>

      <Listproduct />
    </div>
  );
}
