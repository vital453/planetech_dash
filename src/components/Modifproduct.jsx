"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import * as imageConversion from "image-conversion";
import Axios from "axios";
import {
  recupCateg,
  recupProduct,
  recupdetail,
  recupsub_category,
  recupsub_sub_category,
} from "@/redux/features/productSlice";
import Image from "next/image";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { settrigg } from "@/redux/features/TriggerSlice";
import JoditEditor from "jodit-react";
// import { useRouter } from "next/router";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from 'next/navigation'
// import { FiArrowLeftCircle } from "react-icons/fi";

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

export default function Modifproduct({ ids }) {
  const id = rep(ids);
  const router = useRouter()
  const [nom, setnom] = useState("");
  const [description, setdescription] = useState("");
  const [discount_type, setdiscount_type] = useState("");
  const [categorieid, setcategorieid] = useState("");
  const [categorie, setcategorie] = useState([]);
  const [souscategorieid, setsouscategorieid] = useState("");
  const [souscategorie, setsouscategorie] = useState([]);
  const [sous_soucategorie, setsous_soucategorie] = useState([]);
  const [sous_soucategorieid, setsous_soucategorieid] = useState("");
  const [prix_achat, setprix_achat] = useState("");
  const [prix_vente, setprix_vente] = useState("");
  const [picture1, setpicture1] = useState("");
  const [picture2, setpicture2] = useState("");
  const [picture3, setpicture3] = useState("");
  const [picture4, setpicture4] = useState("");
  const [picture5, setpicture5] = useState("");
  const [picture6, setpicture6] = useState("");
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const [stock, setstock] = useState("");
  const [discount_value, setdiscount_value] = useState("");
  // const router = useRouter();

  const [type_promotion, settype_promotion] = useState("");
  const [progress, setprogress] = useState(false);
  const [message, setmessage] = useState("");

  const dispatch = useDispatch();

  const [fileinputstate, setfileinputstate] = useState("");
  const [previewsource, setpreviewsource] = useState("");
  const [fileinputstate2, setfileinputstate2] = useState("");
  const [previewsource2, setpreviewsource2] = useState("");
  const [fileinputstate3, setfileinputstate3] = useState("");
  const [previewsource3, setpreviewsource3] = useState("");
  const [fileinputstate4, setfileinputstate4] = useState("");
  const [previewsource4, setpreviewsource4] = useState("");
  const [fileinputstate5, setfileinputstate5] = useState("");
  const [previewsource5, setpreviewsource5] = useState("");
  const [fileinputstate6, setfileinputstate6] = useState("");
  const [previewsource6, setpreviewsource6] = useState("");

  // const router = useRouter()

  const getdetailproduct = async () => {
    await Axios.post("https://back-planetech.onrender.com/product_detail", {
      id: id,
    }).then((ret) => {
      if (ret.data) {
        dispatch(recupdetail(ret.data));
        setnom(ret.data.name);
        setdescription(ret.data.description);
        setdiscount_type(ret.data.discount_type);
        setprix_achat(ret.data.purchase_price);
        setprix_vente(ret.data.selling_price);
        setstock(ret.data.stock);
        setcategorieid(ret.data.id_category);
        setsouscategorieid(ret.data.id_sub_category);
        setsous_soucategorieid(ret.data.id_sub_sub_category);
        setpicture1(ret.data.picture1);
        setpicture2(ret.data.picture2);
        setpicture3(ret.data.picture3);
        setpicture4(ret.data.picture4);
        setpicture5(ret.data.picture5);
        setpicture6(ret.data.picture6);
        setdiscount_value(ret.data.discount_value);
      }
    });
  };

  const handlesetimage = (e) => {
    const file = e.target.files[0];
    previewfile(file);
  };
  const previewfile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewsource(reader.result);
    };
  };
  const handlesetimage2 = (e) => {
    const file = e.target.files[0];
    previewfile2(file);
  };
  const previewfile2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewsource2(reader.result);
    };
  };
  const handlesetimage3 = (e) => {
    const file = e.target.files[0];
    previewfile3(file);
  };
  const previewfile3 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewsource3(reader.result);
    };
  };
  const handlesetimage4 = (e) => {
    const file = e.target.files[0];
    previewfile4(file);
  };
  const previewfile4 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewsource4(reader.result);
    };
  };
  const handlesetimage5 = (e) => {
    const file = e.target.files[0];
    previewfile5(file);
  };
  const previewfile5 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewsource5(reader.result);
    };
  };
  const handlesetimage6 = (e) => {
    const file = e.target.files[0];
    previewfile6(file);
  };
  const previewfile6 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewsource6(reader.result);
    };
  };

  const categories = useSelector((state) => state.product.categories);
  const sub_category = useSelector((state) => state.product.sub_category);
  const sub_sub_category = useSelector(
    (state) => state.product.sub_sub_category
  );

  const totalSteps = 10;
  const [currentStep, setCurrentStep] = useState(0);
  // Calculer la largeur de la barre de progression en pourcentage
  const [progressWidth, setprogressWidth] = useState(
    (currentStep / totalSteps) * 100
  );

  useEffect(() => {
    setprogressWidth((currentStep / totalSteps) * 100);
  }, [currentStep]);

  useEffect(() => {
    getdetailproduct();
  }, []);

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const [userInfo2, setuserInfo2] = useState({
    file: [],
    filepreview: null,
  });

  const [userInfo3, setuserInfo3] = useState({
    file: [],
    filepreview: null,
  });
  const [userInfo4, setuserInfo4] = useState({
    file: [],
    filepreview: null,
  });
  const [userInfo5, setuserInfo5] = useState({
    file: [],
    filepreview: null,
  });
  const [userInfo6, setuserInfo6] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setmessage("Veuillez insérer des images au format png ou jpg");
      setShowToast4(true);
    } else {
      if (parseInt(event.target.files[0].size) > 2000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 2Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          500
        );
        const myFile = new File([res], event.target.files[0].name, {
          type: res.type,
        });
        setuserInfo({
          ...userInfo,
          file: myFile,
          filepreview: URL.createObjectURL(myFile),
        });
      }
    }
  };
  const handleInputChange2 = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setmessage("Veuillez insérer des images au format png ou jpg");
      setShowToast4(true);
    } else {
      if (parseInt(event.target.files[0].size) > 2000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 2Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          500
        );
        const myFile = new File([res], event.target.files[0].name, {
          type: res.type,
        });
        setuserInfo2({
          ...userInfo2,
          file: myFile,
          filepreview: URL.createObjectURL(myFile),
        });
      }
    }
  };
  const handleInputChange3 = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setmessage("Veuillez insérer des images au format png ou jpg");
      setShowToast4(true);
    } else {
      if (parseInt(event.target.files[0].size) > 2000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 2Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          500
        );
        const myFile = new File([res], event.target.files[0].name, {
          type: res.type,
        });
        setuserInfo3({
          ...userInfo3,
          file: myFile,
          filepreview: URL.createObjectURL(myFile),
        });
      }
    }
  };
  const handleInputChange4 = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setmessage("Veuillez insérer des images au format png ou jpg");
      setShowToast4(true);
    } else {
      if (parseInt(event.target.files[0].size) > 2000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 2Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          500
        );
        const myFile = new File([res], event.target.files[0].name, {
          type: res.type,
        });
        setuserInfo4({
          ...userInfo4,
          file: myFile,
          filepreview: URL.createObjectURL(myFile),
        });
      }
    }
  };
  const handleInputChange5 = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setmessage("Veuillez insérer des images au format png ou jpg");
      setShowToast4(true);
    } else {
      if (parseInt(event.target.files[0].size) > 2000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 2Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          500
        );
        const myFile = new File([res], event.target.files[0].name, {
          type: res.type,
        });
        setuserInfo5({
          ...userInfo5,
          file: myFile,
          filepreview: URL.createObjectURL(myFile),
        });
      }
    }
  };
  const handleInputChange6 = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setmessage("Veuillez insérer des images au format png ou jpg");
      setShowToast4(true);
    } else {
      if (parseInt(event.target.files[0].size) > 2000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 2Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          500
        );
        const myFile = new File([res], event.target.files[0].name, {
          type: res.type,
        });
        setuserInfo6({
          ...userInfo6,
          file: myFile,
          filepreview: URL.createObjectURL(myFile),
        });
      }
    }
  };

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://back-planetech.onrender.com/affichecategorie",
    fetcher
  );
  if (error) {
    console.log("error");
  } else if (data) {
    console.log(data);
  } else if (isLoading) {
    console.log("loading");
  }

  const getcategory = () => {
    // console.log(`${process.env.baseurl}` + "valuer enviro");
    Axios.get("https://back-planetech.onrender.com/affichecategorie", {}).then(
      (response) => {
        if (response.data[0]) {
          console.log(response.data);
          dispatch(recupCateg(response.data));
          // localStorage.setItem("change_version", "non");
        }
      }
    );
  };
  const getsubcategory = () => {
    Axios.get(
      "https://back-planetech.onrender.com/affichesub_category",
      {}
    ).then((response) => {
      if (response.data[0]) {
        console.log(response.data);
        dispatch(recupsub_category(response.data));
        // localStorage.setItem("change_version", "non");
      }
    });
  };
  const getsub_subcategory = () => {
    Axios.get(
      "https://back-planetech.onrender.com/affichesub_sub_category",
      {}
    ).then((response) => {
      if (response.data[0]) {
        console.log(response.data);
        dispatch(recupsub_sub_category(response.data));
        // localStorage.setItem("change_version", "non");
      }
    });
  };

  const submit = async (e, a, obj) => {
    // setprogress(true);
    const formdata = new FormData();
    formdata.append("avatar", obj);
    await Axios.post(
      "https://back-planetech.onrender.com/insert_image/",
      { data: obj, id: e, stat: a },
      {
        headers: { "Content-type": "application/json" },
      }
    )
      .then((res) => {
        // then print response status
        console.warn(res);
        if (res.data.success === 1) {
          console.log("image send");
          if (a == 1) {
            setTimeout(() => {
              setCurrentStep(4);
            }, 1000);
          } else if (a == 2) {
            setTimeout(() => {
              setCurrentStep(5);
            }, 1000);
          } else if (a == 3) {
            setTimeout(() => {
              setCurrentStep(6);
            }, 1000);
          } else if (a == 4) {
            setTimeout(() => {
              setCurrentStep(7);
            }, 1000);
          } else if (a == 5) {
            setTimeout(() => {
              setCurrentStep(8);
            }, 1000);
          } else if (a == 6) {
            setTimeout(() => {
              setCurrentStep(9);
            }, 1000);
          }
        } else {
          console.log("pas bien passser");
        }
      })
      .catch((error) => {});
  };

  const envoi = async () => {
    setTimeout(() => {
      setprogress(true);
      setCurrentStep(1);
    }, 1000);
    setTimeout(() => {
      setCurrentStep(2);
    }, 1000);
    await Axios.post("https://back-planetech.onrender.com/edit_product", {
      id_product: id,
      nom: nom,
      description: description,
      categorieid: parseInt(categorieid),
      souscategorieid: parseInt(souscategorieid),
      sous_soucategorieid: parseInt(souscategorieid),
      prix_achat: parseInt(prix_achat),
      prix_vente: parseInt(prix_vente),
      stock: parseInt(stock),
      discount_type: discount_type,
      discount_value: parseInt(discount_value),
      seller_id: 1,
    }).then((ret) => {
      if (ret.data === "suc") {
        setTimeout(() => {
          setCurrentStep(3);
        }, 1000);
        if (previewsource) {
          submit(id, 1, previewsource);
        } else {
          setTimeout(() => {
            setCurrentStep(4);
          }, 1000);
        }
        if (previewsource2) {
          console.log("est passer par ici");
          submit(id, 2, previewsource2);
        } else {
          setTimeout(() => {
            setCurrentStep(5);
          }, 1000);
        }

        if (previewsource) {
          submit(id, 3, previewsource3);
        } else {
          setTimeout(() => {
            setCurrentStep(6);
          }, 1000);
        }
        if (previewsource4) {
          submit(id, 4, previewsource4);
        } else {
          setTimeout(() => {
            setCurrentStep(7);
          }, 1000);
        }
        if (previewsource5) {
          submit(id, 5, previewsource5);
        } else {
          setTimeout(() => {
            setCurrentStep(8);
          }, 1000);
        }
        if (previewsource6) {
          submit(id, 6, previewsource6);
        } else {
          setTimeout(() => {
            setCurrentStep(9);
          }, 1000);
        }
        Axios.get(
          "https://back-planetech.onrender.com/affiche_produit",
          {}
        ).then((response) => {
          if (response.data[0]) {
            console.log(response.data);
            dispatch(recupProduct(response.data));
            setTimeout(() => {
              setCurrentStep(10);
            }, 1000);
            setTimeout(() => {
              setprogress(false);
              // toast("produit ajouter");
              toast("produit modifier avec succes");
            }, 2000);
            setTimeout(() => {
              dispatch(settrigg(false));
            }, 4000);
            router.push('/product_list')
            // localStorage.setItem("change_version", "non");
          }
        });
      }
    });
  };

  const myLoader = ({ src }) => {
    // return `${API}/user/photo/${blog.postedBy.username}`;
  };

  useEffect(() => {
    getcategory();
    getsubcategory();
    getsub_subcategory();
  }, []);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="bg-white px-4 py-4 flex flex-col justify-center items-center rounded-lg space-y-4 md:space-y-10">
        <div className="w-full flex flex-col justify-center items-center space-y-4 md:space-y-10">
          <div className="w-full justify-start items-center text-start">
            {/* <div
              className="text-2xl text-blue-900 cursor-pointer"
              onClick={() => router.push("product_list")}
            >
              <BsFillArrowLeftCircleFill />
            </div> */}
            <span className="text-2xl font-semibold">
              Modification d'un produit
            </span>
            {/* <span>{categorieids}value picture1</span> */}
            {/* {sub_category[0] && <span>donner arriver</span>} */}
          </div>
          <div className="flex flex-col justify-center items-center w-full md:flex-row md:w-full md:justify-between md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4 md:space-y-10">
              <div className="flex flex-col justify-center items-start space-y-3 w-full">
                <span>Nom</span>
                <input
                  type="text"
                  className="bg-white border-2 h-12 px-1 py-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Nom du Produit"
                  value={nom}
                  onChange={(e) => {
                    setnom(e.target.value);
                  }}
                  // onChange={(e) => setserach(e.target.value)}
                  // value={search}
                />
              </div>
              {/* <div className="flex flex-col justify-center items-start space-y-3 w-full">
                <span>Description</span>
                <textarea
                  type="text"
                  className="bg-white border-2 h-36 px-1 py-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                  // onChange={(e) => setserach(e.target.value)}
                  // value={search}
                />
              </div> */}
              <div className="flex flex-col justify-center items-start space-y-3 w-full">
                <span>Description</span>
                <div className="w-full">
                  <JoditEditor
                    // className="bg-white border-2  shadow-sm border-slate-300 w-full rounded-md"
                    ref={editor}
                    value={description}
                    // config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={
                      (newContent) => setdescription(newContent)
                      // setdescription(HTMLReactParser(newContent))
                    } // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => setdescription(newContent)}
                  />
                </div>
              </div>
              <select
                className="p-[12px]  bg-white rounded-lg w-full shadow-sm border-slate-300 border-2 placeholder-slate-400"
                name="country-selector"
                placeholder="Selectionner la categorie"
                onChange={(e) => setcategorieid(e.target.value)}
                value={categorieid}
                id=""
              >
                <option selected="" value={0}>
                  Catégorie
                </option>
                {categories[0] &&
                  categories.map((data, i) => {
                    return (
                      <option value={data.id} key={i}>
                        {/* <option selected="" value={data.id}> */}
                        {data.nom}
                      </option>
                    );
                  })}
              </select>
              <select
                className="p-[12px]  bg-white rounded-lg w-full shadow-sm border-slate-300 border-2 placeholder-slate-400"
                name="country-selector"
                onChange={(e) => setsouscategorieid(e.target.value)}
                value={souscategorieid}
                id=""
              >
                <option
                  selected=""
                  value={0}
                  onClick={() => console.log(categorieid)}
                >
                  Sous Catégorie
                </option>
                {sub_category[0] &&
                  sub_category
                    .filter((t) => t.id_category == categorieid)
                    .map((data, i) => {
                      return (
                        <option value={data.id} key={i}>
                          {/* <option selected="" value={data.id}> */}
                          {data.nom}
                        </option>
                      );
                    })}
              </select>
              <select
                className="p-[12px]  bg-white rounded-lg w-full shadow-sm border-slate-300 border-2 placeholder-slate-400"
                name="country-selector"
                onChange={(e) => setsous_soucategorieid(e.target.value)}
                value={sous_soucategorieid}
                id=""
              >
                <option
                  selected=""
                  value={0}
                  onClick={() => {
                    console.log(categorieid);
                    console.log(souscategorieid);
                  }}
                >
                  Sous Sous Catégorie
                </option>
                {sub_sub_category[0] &&
                  sub_sub_category
                    .filter(
                      (t) =>
                        t.id_category == categorieid &&
                        t.id_sub_category == souscategorieid
                    )
                    .map((data, i) => {
                      return (
                        <option value={data.id} key={i}>
                          {/* <option selected="" value={data.id}> */}
                          {data.nom}
                        </option>
                      );
                    })}
              </select>
              {/* <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          /> */}
              <div className="flex flex-col justify-center items-start space-y-3 w-full">
                <span>
                  Prix d'achat <span className="font-bold text-red-700">*</span>
                </span>
                <input
                  type="number"
                  className="bg-white border-2 h-12 px-1 py-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Prix d'achat"
                  value={prix_achat}
                  onChange={(e) => {
                    setprix_achat(e.target.value);
                  }}
                  // onChange={(e) => setserach(e.target.value)}
                  // value={search}
                />
              </div>
              <div className="flex flex-col justify-center items-start space-y-3 w-full">
                <span>
                  Prix de vente{" "}
                  <span className="font-bold text-red-700">*</span>
                </span>
                <input
                  type="number"
                  className="bg-white border-2 h-12 px-1 py-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Prix de vente"
                  value={prix_vente}
                  onChange={(e) => {
                    setprix_vente(e.target.value);
                  }}
                  // onChange={(e) => setserach(e.target.value)}
                  // value={search}
                />
              </div>
            </div>
            <span className="border-b-[1px] border-gray-200 w-full md:w-[1px] md:h-full md:bg-gray-200"></span>
            <div className="w-full md:w-1/2 flex flex-col justify-start items-start space-y-4  md:flex-col md:space-x-0 md:space-y-10">
              <div className="w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="w-full md:w-1/3">
                  <label
                    className={`${
                      !previewsource && picture1 == null
                        ? "custum-file-upload"
                        : "custum-file-uploadd"
                    }`}
                    htmlFor="file1"
                  >
                    {previewsource != "" ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={previewsource}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : picture1 != null ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={picture1}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : (
                      // <Image src={image} alt="sjf" fill className="object-cover" />
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill=""
                          viewBox="0 0 24 24"
                        >
                          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                          <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            id="SVGRepo_tracerCarrier"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fill=""
                              d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>
                    )}
                    {!previewsource && picture1 == null && (
                      <div className="text">
                        <span>Click to upload image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="file1"
                      // onChange={handleInputChange}
                      onChange={handlesetimage}
                      // onChange={handleInputChange}
                      value={fileinputstate}
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/3">
                  <label
                    className={`${
                      !previewsource2 && picture2 == null
                        ? "custum-file-upload"
                        : "custum-file-uploadd"
                    }`}
                    htmlFor="file2"
                  >
                    {previewsource2 != "" ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={previewsource2}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : picture2 != null ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={picture2}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill=""
                          viewBox="0 0 24 24"
                        >
                          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                          <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            id="SVGRepo_tracerCarrier"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fill=""
                              d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>
                    )}
                    {!previewsource2 && picture2 == null && (
                      <div className="text">
                        <span>Click to upload image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="file2"
                      onChange={handlesetimage2}
                      // onChange={handleInputChange}
                      value={fileinputstate2}
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/3">
                  <label
                    className={`${
                      !previewsource3 && picture3 == null
                        ? "custum-file-upload"
                        : "custum-file-uploadd"
                    }`}
                    htmlFor="file3"
                  >
                    {previewsource3 != "" ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={previewsource3}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : picture3 != null ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={picture3}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill=""
                          viewBox="0 0 24 24"
                        >
                          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                          <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            id="SVGRepo_tracerCarrier"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fill=""
                              d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>
                    )}
                    {!previewsource3 && picture3 == null && (
                      <div className="text">
                        <span>Click to upload image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="file3"
                      onChange={handlesetimage3}
                      // onChange={handleInputChange}
                      value={fileinputstate3}
                    />
                  </label>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="w-full md:w-1/3">
                  <label
                    className={`${
                      !previewsource4 && picture4 == null
                        ? "custum-file-upload"
                        : "custum-file-uploadd"
                    }`}
                    htmlFor="file4"
                  >
                    {previewsource4 != "" ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={previewsource4}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : picture4 != null ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={picture4}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill=""
                          viewBox="0 0 24 24"
                        >
                          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                          <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            id="SVGRepo_tracerCarrier"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fill=""
                              d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>
                    )}
                    {!previewsource4 && picture4 == null && (
                      <div className="text">
                        <span>Click to upload image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="file4"
                      onChange={handlesetimage4}
                      // onChange={handleInputChange}
                      value={fileinputstate4}
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/3">
                  <label
                    className={`${
                      !previewsource5 && picture5 == null
                        ? "custum-file-upload"
                        : "custum-file-uploadd"
                    }`}
                    htmlFor="file5"
                  >
                    {previewsource5 != "" ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={previewsource5}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : picture5 != null ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={picture5}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill=""
                          viewBox="0 0 24 24"
                        >
                          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                          <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            id="SVGRepo_tracerCarrier"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fill=""
                              d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>
                    )}
                    {!previewsource5 && picture5 == null && (
                      <div className="text">
                        <span>Click to upload image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="file5"
                      onChange={handlesetimage5}
                      // onChange={handleInputChange}
                      value={fileinputstate5}
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/3">
                  <label
                    className={`${
                      !previewsource6 && picture6 == null
                        ? "custum-file-upload"
                        : "custum-file-uploadd"
                    }`}
                    htmlFor="file6"
                  >
                    {previewsource6 != "" ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={previewsource6}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : picture6 != null ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={picture6}
                          alt="sjf"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill=""
                          viewBox="0 0 24 24"
                        >
                          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                          <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            id="SVGRepo_tracerCarrier"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fill=""
                              d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>
                    )}
                    {!previewsource6 && picture6 == null && (
                      <div className="text">
                        <span>Click to upload image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="file6"
                      onChange={handlesetimage6}
                      // onChange={handleInputChange}
                      value={fileinputstate6}
                    />
                  </label>
                </div>
              </div>

              <select
                className="p-[12px]  bg-white rounded-lg w-full shadow-sm border-slate-300 border-2 placeholder-slate-400"
                name="country-selector"
                onChange={(e) => setdiscount_type(e.target.value)}
                value={discount_type}
                id=""
              >
                <option selected="" value="0">
                  Type de la promotion
                </option>
                <option value="Pourcentage">Pourcentage</option>
                <option value="Espece">Espece</option>
              </select>
              {discount_type != "" && (
                <div className="flex flex-col justify-center items-start space-y-3 w-full">
                  <span>Valeur de la reduction</span>
                  <input
                    type="number"
                    className="bg-white border-2 h-12 px-1 py-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Valeur de la reduction"
                    value={discount_value}
                    onChange={(e) => {
                      setdiscount_value(e.target.value);
                      // console.log(e.target.value);
                    }}
                    // onChange={(e) => setserach(e.target.value)}
                    // value={search}
                  />
                </div>
              )}
              <div className="flex flex-col justify-center items-start space-y-3 w-full">
                <span>
                  Stock <span className="font-bold text-red-700">*</span>
                </span>
                <input
                  type="number"
                  className="bg-white border-2 h-12 px-1 py-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => {
                    setstock(e.target.value);
                  }}
                  // onChange={(e) => setserach(e.target.value)}
                  // value={search}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          {/* {progress ? (
          <div class="flex-col gap-4 w-full flex items-center justify-center">
            <div class="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                class="animate-ping"
              >
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
              </svg>
            </div>
          </div>
        ) : ( */}
          {progress ? (
            <>
              {/* <div className="mb-3"></div>
                  <IonProgressBar type="indeterminate"></IonProgressBar> */}
              <div>
                <div className="progress-container">
                  <div
                    className="progress-barrrs"
                    style={{ width: `${progressWidth}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-center text-xl text-neutral-800 mt-4">
                  <span className="ml-0">Chargement des données</span>
                  <div class="ml-3 dot-spinner">
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                    <div class="dot-spinner__dot"></div>
                  </div>
                </div>
                {/* <div className="step-container">
                      <div
                        className={`step ${currentStep <= 5 ? "active" : ""}`}
                      >
                        Étape 1
                      </div>
                      <div
                        className={`step ${currentStep >= 6 ? "active" : ""}`}
                      >
                        Étape 2
                      </div>
                    </div> */}
              </div>
            </>
          ) : (
            <Button
              color="blue"
              onClick={() => {
                envoi();
              }}
            >
              {/* <Button color="blue" onClick={handleclick}> */}
              Enregistrer
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
