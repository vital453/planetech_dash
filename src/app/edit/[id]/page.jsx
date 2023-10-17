"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import Modifproduct from "@/components/modifproduct";
import { useDispatch, useSelector } from "react-redux";
import {
  recupCateg,
  recupdetail,
  recupsub_category,
  recupsub_sub_category,
} from "@/redux/features/productSlice";
import Axios from "axios";

const rep = (id) => {
  // Créez une expression régulière pour correspondre aux lettres alphabétiques
  const regexAlphabet = /[a-zA-Z]/;
  // Utilisez la méthode test() de l'expression régulière pour vérifier le contenu de la variable
  const contientLettres = regexAlphabet.test(id);
  // Utilisez le résultat pour prendre des mesures
  if (contientLettres) {
    return notFound();
    // console.log("La variable contient des lettres ou des caractères alphabétiques.");
  } else {
    return id;
    // console.log("La variable ne contient que des chiffres ou des caractères spéciaux.");
  }
};
export default function page({ params }) {
  const id = rep(params.id);
  const detail = useSelector((state) => state.product.detail);
  const [det, setdet] = useState([]);
  const dispatch = useDispatch();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/product_list");
    },
  });

  console.log(session);
  const getdetailproduct = async () => {
    await Axios.post("https://back-planetech.onrender.com/product_detail", {
      id: id,
    }).then((ret) => {
      if (ret.data) {
        dispatch(recupdetail(ret.data));
        setdet(ret.data);
        console.log(ret.data, "recup data");
      }
    });
  };
  useEffect(() => {
    // if (detail[0]) {
    getdetailproduct();
    // }
  }, []);

  return (
    <>
      {/* {det.map((data, i) => {
        return ( */}
      <Modifproduct ids={id} />
      {/* ); 
   })}*/}
    </>
  );
}
