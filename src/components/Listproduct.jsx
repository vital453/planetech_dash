"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Card from "./Card";
import Addproduct from "./Addproduct";
// import { useDispatch } from "react-redux";
import useSWR from "swr";
import * as imageConversion from "image-conversion";
import Axios from "axios";
import { recupProduct } from "@/redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { settrigg } from "@/redux/features/TriggerSlice";
import Image from "next/image";

export default function Listproduct() {
  const [add, setadd] = useState(false);
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.product);
  const trigg = useSelector((state) => state.trigger.trigg);

  const get_product = () => {
    Axios.get("https://back-planetech.onrender.com/affiche_produit", {}).then(
      (response) => {
        if (response.data[0]) {
          console.log(response.data);
          dispatch(recupProduct(response.data));
          // localStorage.setItem("change_version", "non");
        }
      }
    );
  };
  useEffect(() => {
    get_product();
  }, [product]);

  return (
    <div className="w-full justify-center items-center space-y-4">
      {!trigg && (
        <Button color="blue" onClick={() => dispatch(settrigg(true))}>
          {/* <Button color="blue" onClick={handleclick}> */}
          Ajouter un produit
        </Button>
      )}
      <div className=" w-full justify-center items-center">
        {trigg ? (
          <>
            <Addproduct />
            <div className="h-10"></div>
          </>
        ) : (
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center">
            {product[0] ? (
              <>
                {product.map((data, i) => {
                  return <Card data={data} />;
                })}
              </>
            ) : (
              <div className="w-full justify-center items-center flex flex-col">
                <div class="loading">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>Chargement en cours</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
