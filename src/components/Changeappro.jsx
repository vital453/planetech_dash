"use client";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import {
  deleteProduct,
  recupPan,
  updateQuantity,
} from "@/redux/features/panieerSlice";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { recupProduct } from "@/redux/features/productSlice";
import Axios from "axios";


export default function Changeappro({ Stock, id, prix_unite, nom }) {
  const dispatch = useDispatch();
  let panier = useSelector((state) => state.panier.panier);
  const [quantite, setQuantite] = useState(0);
  const [change, setchange] = useState(false);

  const increm = () => {
    // if (quantite < Stock) {
    // }
    setQuantite(quantite + 1);
  };
  const decrem = () => {
    if (quantite > 0) {
      setQuantite(quantite - 1);
    }
  };
  const suppression = (id) => {
    dispatch(deleteProduct(id));
  };

  const get_product = () => {
    Axios.get("http://localhost:3004/affiche_produit", {}).then((response) => {
      if (response.data[0]) {
        console.log(response.data);
        dispatch(recupProduct(response.data));
        // localStorage.setItem("change_version", "non");
      }
    });
  };

  const transfert = (quant) => {
    if (quant > 0) {
      // setProgress(true);
      // setprogress1(true);
      // setprogress1(true);
      // toast.loading(
      //   "Opération en cours de traitement....\n\nVeuillez patienter.",
      //   {
      //     duration: 6000,
      //   }
      // );
      Axios.post("http://localhost:3004/ajoutappro", {
        stock_appro: parseInt(quant),
        total_price: parseInt(prix_unite) * parseInt(quant),
        unite_price: parseInt(prix_unite),
        product_name: nom,
        product_id: id,
        stock_preview: Stock,
        seller_id: 1,
      }).then((ret) => {
        console.log(ret.data);
        if (ret.data == "suc") {
          Axios.post("http://localhost:3004/maj_stock_appro", {
            stock: parseInt(quant) + parseInt(String(Stock)),
            product_id: id,
            seller_id: 1,
          }).then((ret) => {
            if (ret.data == "suc") {
              toast("Approvisionnement effectué");
              console.log("Approvisionnement effectué");
              setQuantite(1);
              get_product();
              setchange(false);
            }
          });
        }
      });
    } else {
      toast("Veillez renseigner la quantite");
    }
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>{" "}
      {change ? (
        <div className="flex flex-col justify-center items-center space-y-0 space-x-0 px-4">
          <div className="justify-between items-center flex space-x-4 w-full my-3">
            <Button
              className=""
              onClick={() => {
                decrem();
              }}
            >
              -
            </Button>

            <input
              type="text"
              className="px-4 py-2 w-16 rounded-xl outline-none "
              value={quantite}
              onChange={(e) => {
                setQuantite(e.target.value);
              }}
            />
            <Button
              className=""
              onClick={() => {
                increm();
              }}
            >
              +
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-3 w-full mb-3">
            <Button
              className="bg-green-500 text-lg"
              onClick={() => {
                // misajour();
                transfert(quantite);
              }}
            >
              <AiFillCheckCircle />
            </Button>

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
        <div className="px-2 py-3 border-t rounded-b-xl border-gray-300 bg-gray-100 space-y-3 w-full flex flex-col justify-center items-center md:flex-row md:space-y-0 md:space-x-4 md:justify-between md:items-center">
          <Link href={`/edit/${id}`} className="w-full">
            <Button className="w-full">Modifier</Button>
          </Link>
          <Button className="w-full" onClick={() => setchange(true)}>
            Approvisionner
          </Button>
        </div>
      )}
    </div>
  );
}
