"use client";
import React, { useEffect, useState } from "react";
import { pic1 } from "@/assets/images";
import Image from "next/image";
import CurrencyFormat from "react-currency-format";
import { HiArchive } from "react-icons/hi";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  deleteProduct,
  setProductPan,
  updateQuantity,
} from "@/redux/features/panieerSlice";

export default function Card1({ data }) {
  console.log(data.picture1);
  const [quantite, setQuantite] = useState(1);
  const [progress, setprogress] = useState(false);
  let panier = useSelector((state) => state.panier.panier);
  const [change, setchange] = useState(false);
  const [ajoute, setAjoute] = useState();
  const dispatch = useDispatch();

  const increm = () => {
    if (quantite < data.stock) {
      if (data.stock > 0) {
        setQuantite(quantite + 1);
      }
    }
  };
  const decrem = () => {
    if (quantite > 0) {
      if (data.stock > 0) {
        setQuantite(quantite - 1);
      }
    }
  };
  const calcul = (discount_type, discount_value, selling_price, quantite) => {
    if (discount_type == "") {
      return parseInt(selling_price) * parseInt(quantite);
    } else if (discount_type == "Pourcentage") {
      const prixavan = parseInt(selling_price) * parseInt(quantite);
      const prixpourcent = (selling_price * discount_value) / 100;
      return prixavan - prixpourcent;
    } else if (discount_type == "Espece") {
      return parseInt(selling_price) * parseInt(quantite) - discount_value;
    }
  };
  const ajout = () => {
    if (data.stock > 0) {
      setprogress(true);
      if (ajoute) {
        if (quantite == 0) {
          // suppression(Id);
          dispatch(deleteProduct(data.id));
          toast("Produit supprimer du panier");
          setchange(false);
        } else {
          setAjoute(quantite);
          dispatch(
            updateQuantity([
              parseInt(quantite),
              data.id,
              data.selling_price * parseInt(quantite),
            ])
          );
          toast("Produit mis a jous dans le panier");
          setQuantite(1);
          setprogress(false);
          setchange(false);
        }
      } else {
        setAjoute(quantite);
        if (!panier.find((e) => e.product_id == data.id) && quantite > 0) {
          dispatch(
            setProductPan({
              product_id: data.id,
              product_quantity: parseInt(quantite),
              product_name: data.name,
              unite_price: data.selling_price,
              total_price: calcul(
                data.discount_type,
                data.discount_value,
                data.selling_price,
                quantite
              ),
              picture1: data.picture1,
              stock: data.stock,
              total_sold: data.total_sold == null ? 0 : data.total_sold,
              discount_type:
                data.discount_type == null ? "" : data.discount_type,
              discount_value:
                data.discount_value == null ? 0 : data.discount_value,
            })
          );
          toast("Produit ajouter dans le panier");
          setchange(false);
          setprogress(false);
          setQuantite(1);
        }
      }
    } else {
      toast("Stock insufisant");
      setchange(false);
      setprogress(false);
    }
  };
  const getpan = () => {
    if (panier.filter((t) => t.product_id == data.id)[0]) {
      setAjoute(
        panier.filter((t) => t.product_id == data.id)[0].product_quantity
      );
    } else {
      setAjoute(0);
    }
  };

  useEffect(() => {
    getpan();
  }, []);
  return (
    <div className="max-w-32 w-[90%] cursor-pointer rounded-xl">
      <div>
        <Toaster />
      </div>

      <div className="bg-white shadow-xl rounded-xl w-full justify-start items-center">
        <div className="relative w-full bg-cover bg-center h-56">
          <Image
            src={pic1}
            alt="sjf"
            fill
            className="object-cover rounded-t-xl"
          />
        </div>
        <div className="px-2 py-3 space-y-3">
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
        <div className="px-2 py-3 border-t rounded-b-xl border-gray-300 bg-gray-100 w-full flex justify-center items-center">
          {change ? (
            <div className="w-full flex flex-col justify-center items-center space-y-3">
              <div className="justify-center items-center flex space-x-4">
                <Button className="" onClick={() => decrem()}>
                  -
                </Button>
                {/* <div className="px-4 py-2 w-16 rounded-xl bg-white">
                  {quantite}
                </div> */}
                <input
                  type="text"
                  className="px-4 py-2 w-16 rounded-xl outline-none "
                  value={quantite}
                  onChange={(e) => {
                    setQuantite(e.target.value);
                  }}
                />
                <Button className="" onClick={() => increm()}>
                  +
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-3">
                {/* {progress ? (
                  <div class="loader"></div>
                ) : ( */}
                <Button
                  className="bg-green-500 text-lg"
                  onClick={() => {
                    ajout();
                    // console.log(calcul(data.discount_type, data.discount_value, data.selling_price, quantite));
                  }}
                >
                  <AiFillCheckCircle />
                </Button>
                {/* )} */}

                <Button
                  className="bg-red-500 text-lg"
                  onClick={() => {
                    setchange(false);
                  }}
                >
                  <AiFillCloseCircle />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              className="w-full"
              onClick={() => {
                setchange(true);
                setQuantite(ajoute);
              }}
            >
              Ajouter au panier
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
