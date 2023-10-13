"use client";
import { recupcaisse } from "@/redux/features/productSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import CurrencyFormat from "react-currency-format";

export default function Topcard() {
  let caisse = useSelector((state) => state.product.caisse);
  const dispatch = useDispatch();

  const get_caisse = () => {
    Axios.get("https://back-planetech.onrender.com/get_caisse", {}).then((response) => {
      if (response.data[0]) {
        console.log(response.data);
        dispatch(recupcaisse(response.data[0].caisse));
      }
    });
  };

  useEffect(() => {
    get_caisse();
  }, []);

  return (
    <div className="grid lg:grid-cols-5 gap-4 my-4">
      <div className="lg:col-span-2 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">2,345,768 FCFA</p>
          <p className="text-gray-600">Revenue Journalier</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+18%</span>
        </p>
      </div>
      <div className="lg:col-span-2 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">11,876</p>
          <p className="text-gray-600">Vente Journaliere</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+11%</span>
        </p>
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">
            <CurrencyFormat
              value={caisse}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" FCFA"}
              renderText={(value) => <span>{value}</span>}
            />
          </p>
          <p className="text-gray-600">Caisse</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+17%</span>
        </p>
      </div>
    </div>
  );
}
