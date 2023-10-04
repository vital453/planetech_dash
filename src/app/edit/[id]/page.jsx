"use client";
import React, { useEffect, useState } from "react";
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

  const getdetailproduct = async () => {
    await Axios.post("http://localhost:3004/product_detail", {
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
      {det.map((data, i) => {
        return (
          <Modifproduct
            key={i}
            id={data.id}
            name={data.name}
            descriptions={data.description}
            discount_types={data.discount_type}
            purchase_price={data.purchase_price}
            selling_price={data.selling_price}
            stocks={data.stock}
            categorieids={data.id_category}
            souscategorieids={data.id_sub_category}
            sous_soucategorieids={data.id_sub_sub_category}
            picture1={data.picture1}
            picture2={data.picture2}
            picture3={data.picture3}
            picture4={data.picture4}
            picture5={data.picture5}
            picture6={data.picture6}
            discount_values={data.discount_value}
          />
        );
      })}
    </>
  );
}
