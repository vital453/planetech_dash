"use client";

import { pic1 } from "@/assets/images";
import Image from "next/image";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { HiArchive } from "react-icons/hi";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import Changeappro from "./Changeappro";

export default function Card({ data }) {
  console.log(data.picture1);
  return (
    <div className="max-w-32 w-[90%] cursor-pointer rounded-xl">
      <div className="bg-white shadow-xl rounded-xl w-full justify-start items-center">
        <div className="relative w-full bg-cover bg-center h-56">
          <Image
            src={pic1}
            alt="sjf"
            fill
            className="object-cover rounded-t-xl"
          />
        </div>
        <div className="p-4 space-y-3">
          <div className="w-full justify-between flex items-center h-10">
            <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
              {data.name}
            </p>
            {data.discount_type == "Pourcentage" && (
              <div className="h-10 w-10 rounded-full bg-red-600 text-white text-sm flex justify-center items-center p-4">
                -{data.discount_value}%
              </div>
            )}
            {data.discount_type == "Espece" && (
              <div className="h-10 w-10 rounded-full bg-red-600 text-white text-xs flex justify-center items-center p-4">
                -{data.discount_value} FCFA
              </div>
            )}
          </div>
          <div className="w-full justify-between items-center flex">
            <div>
              <p className="text-xl text-gray-900">
                <CurrencyFormat
                  value={data.selling_price === 0 ? 0 : data.selling_price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" FCFA"}
                  renderText={(value) => <span>{value}</span>}
                />
              </p>
            </div>
            <div className="flex justify-center items-center space-x-1">
              <span>Stock: </span>
              <span className="text-gray-900 font-bold">{data.stock}</span>
            </div>
          </div>
        </div>
        <Changeappro
          Stock={data.stock}
          id={data.id}
          prix_unite={data.selling_price}
          nom={data.name}
        />
      </div>
    </div>
  );
}

{
}

// <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
//     {data.name}
//   </p>
//   <div className="flex w-full justify-between">
//     <div>
//       <p className="text-xl text-gray-900">
//         <CurrencyFormat
//           value={data.selling_price === 0 ? 0 : data.selling_price}
//           displayType={"text"}
//           thousandSeparator={true}
//           suffix={" FCFA"}
//           renderText={(value) => <span>{value}</span>}
//         />
//       </p>
//     </div>
//     <div className="flex-1 inline-flex items-center">
//       <HiArchive />
//       <p>
//         <span className="text-gray-900 font-bold">3</span> Bedrooms
//       </p>
//     </div>
//   </div>
