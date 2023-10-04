"use client";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  deleteProduct,
  recupPan,
  updateQuantity,
} from "@/redux/features/panieerSlice";
import toast, { Toaster } from "react-hot-toast";

export default function Changepan({ product_quantity, Stock, id, prix_unite }) {
  const dispatch = useDispatch();
  let panier = useSelector((state) => state.panier.panier);
  const [quantite, setQuantite] = useState(product_quantity);
  const [change, setchange] = useState(false);

  const increm = () => {
    if (quantite < Stock) {
      setQuantite(quantite + 1);
    }
  };
  const decrem = () => {
    if (quantite > 0) {
      setQuantite(quantite - 1);
    }
  };
  const suppression = (id) => {
    dispatch(deleteProduct(id));
  };
  const misajour = () => {
    console.log("Avant la mise à jour : ", quantite);
    if (quantite > 0) {
      dispatch(
        updateQuantity([
          parseInt(quantite),
          id,
          parseInt(quantite * prix_unite),
        ])
      );
      setTimeout(() => {}, 2000);
      toast("Quantite mis a jour dans le panier ");
      dispatch(recupPan(JSON.parse(localStorage.getItem("panier"))));
      setchange(false);
      console.log("Après la mise à jour : ", quantite);
    } else {
      suppression(id);
      toast("produit supprimer du panier");
      dispatch(recupPan(JSON.parse(localStorage.getItem("panier"))));
      setchange(false);
    }
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>{" "}
      {change ? (
        <div className="flex justify-center items-center space-y-0 space-x-2">
          <div className="justify-center items-center flex space-x-4">
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

          <div className="flex items-center justify-center space-x-3">
            <Button
              className="bg-green-500 text-lg"
              onClick={() => {
                misajour();
              }}
            >
              <AiFillCheckCircle />
            </Button>

            {/* <Button
            className="bg-red-500 text-lg"
            onClick={() => {
              // setchange(false);
            }}
          >
            <AiFillCloseCircle />
          </Button> */}
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <span className="font-bold">{product_quantity}</span>
          <FaRegEdit
            className="text-green-600 text-xl cursor-pointer"
            onClick={() => setchange(true)}
          />
        </div>
      )}
    </div>
  );
}
