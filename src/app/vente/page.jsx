"use client";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { recupProduct } from "@/redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { settrigg } from "@/redux/features/TriggerSlice";

import { Button } from "@material-tailwind/react";
import { HiShoppingCart } from "react-icons/hi2";
import Card1 from "@/components/Card1";
import { recupPan, setProductPan, vider } from "@/redux/features/panieerSlice";

import Link from "next/link";
import Header from "@/components/Header";

export default function page() {
  const [add, setadd] = useState(false);
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.product);
  const trigg = useSelector((state) => state.trigger.trigg);
  let panier = useSelector((state) => state.panier.panier);

  const [optSmModal, setOptSmModal] = useState(false);

  const toggleShow = () => setOptSmModal(!optSmModal);

  const get_product = () => {
    Axios.get("http://localhost:3004/affiche_produit", {}).then((response) => {
      if (response.data[0]) {
        console.log(response.data);
        dispatch(recupProduct(response.data));
        // localStorage.setItem("change_version", "non");
      }
    });
  };
  useEffect(() => {
    get_product();
    if (JSON.parse(localStorage.getItem("panier"))) {
      dispatch(recupPan(JSON.parse(localStorage.getItem("panier"))));
    }
  }, []);
  return (
    <>
      <div className="w-full justify-start items-center space-y-4 py-4 px-4">
      <Header title={"Gestion des ventes"}/>
        <Link href={"/shopping_carte"}>
          <Button
            color="blue"
            // onClick={() => dispatch(vider())}
            // onClick={toggleShow}
          >
            {/* <Button color="blue" onClick={handleclick}> */}
            {panier.length === 0 ? "0" : panier.length} <HiShoppingCart />
          </Button>
        </Link>

        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {product[0] &&
            product.map((data, i) => {
              return <Card1 data={data} />;
            })}
        </div>
      </div>
    </>
  );
}
