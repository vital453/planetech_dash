"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
//
import Axios from "axios";
// import CurrencyFormat from "react-currency-format";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { deletepan, recupPan, vider } from "@/redux/features/panieerSlice";
import { recupProduct, recupcaisse } from "@/redux/features/productSlice";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import Changepan from "@/components/Changepan";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";
import { formatPrice } from "../../components/Utilscamp";
import DataTable from "react-data-table-component";

export default function page() {
  const dispatch = useDispatch();
  let panier = useSelector((state) => state.panier.panier);
  const [quantite, setQuantite] = useState(1);
  const [change, setchange] = useState(false);
  const [progress, setprogress] = useState(false);
  const [totalprix, setTotalprix] = useState(0);
  const [totalquant, setTotalquant] = useState(0);
  const totalSteps = 10;
  const [currentStep, setCurrentStep] = useState(0);
  const [response, setresponse] = useState("");

  // Calculer la largeur de la barre de progression en pourcentage
  const [progressWidth, setprogressWidth] = useState(
    (currentStep / totalSteps) * 100
  );

  let caisse = useSelector((state) => state.product.caisse);

  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/vente");
    },
  });
  const getpan = () => {
    console.log(panier, "mon panier");
    const produits = [
      { nom: "Produit 1", prix: 10 },
      { nom: "Produit 2", prix: 20 },
      { nom: "Produit 3", prix: 30 },
      // ...
    ];
    // Utilisez reduce() pour calculer la somme des prix
    const sommePrix = produits.reduce(
      (total, produit) => total + produit.prix,
      0
    );

    console.log("Somme totale des prix : ", sommePrix);
    setTotalquant(
      panier
        .map((e) => e.product_quantity)
        .reduce((prev, curr) => prev + curr, 0)
    );
    const product_quantity = panier.reduce(
      (total, produit) => total + produit.product_quantity,
      0
    );
    console.log(product_quantity, "valeur de la quantite total");
    setTotalprix(
      panier.map((e) => e.total_price).reduce((prev, curr) => prev + curr, 0)
    );
  };
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

  const envoi1 = () => {
    if (parseInt(panier.length) > 0) {
      setprogress(true);
      console.log("1ere etape");
      setTimeout(() => {
        setCurrentStep(1);
      }, 500);
      setTimeout(() => {
        setCurrentStep(2);
      }, 1000);
      Axios.post(
        "https://back-planetech.onrender.com/get_invoice_comand_validation",
        {}
      ).then((ret) => {
        for (let index = 0; index < panier.length; index++) {
          console.log(panier, "mon panier");
          Axios.post("https://back-planetech.onrender.com/ajoutcommand", {
            seller_id: 1,
            product_quantity: panier[index].product_quantity,
            total_price: panier[index].total_price,
            unite_price: panier[index].unite_price,
            product_name: panier[index].product_name,
            product_id: panier[index].product_id,
            stock: panier[index].stock,
            invoice: ret.data,
            total_sold: panier[index].total_sold,
          }).then((rets) => {
            console.log(rets.data, "inserted");
            setTimeout(() => {
              setCurrentStep(3);
            }, 1000);
          });
        }
        console.log(ret.data, "invoice recupe");
        envoi(ret.data);
      });
    } else {
      // setprogress(false);
      // setprogress1(false);
      toast("aucun produit dans le panier");
    }
  };

  const envoi = (ide) => {
    setTimeout(() => {
      setCurrentStep(4);
    }, 1000);

    Axios.post("https://back-planetech.onrender.com/ajoutcomand_validation", {
      totalquant: totalquant,
      totalprix: totalprix,
      invoice: ide,
      whatsapp: "",
      seller_id: 1,
    }).then((ret) => {
      if (ret.data == "suc") {
        setTimeout(() => {
          setCurrentStep(5);
        }, 1000);
        console.log("vente ajoutée");
        console.log("2ere etape");
        console.log(ide, "invoice apres creation de la validation");
        envoi3(ide);
      }
    });
  };

  const get_caisse = () => {
    Axios.get("https://back-planetech.onrender.com/get_caisse", {}).then(
      (response) => {
        if (response.data[0]) {
          console.log(response.data);
          dispatch(recupcaisse(response.data[0].caisse));
        }
      }
    );
  };

  const envoi3 = async (invoices) => {
    if (parseInt(panier.length) > 0) {
      // setinvoicer(invoices);
      // console.log(progress);
      // if (progress) {
      setTimeout(() => {
        setCurrentStep(6);
      }, 1000);
      const last_caisse = caisse;
      //   console.log(last_caisse);
      const end_caisse = parseInt(last_caisse) + totalprix;
      //   console.log(end_caisse);
      console.log("ici");
      console.log(panier, "avant reducquant");
      for (let index = 0; index < panier.length; index++) {
        const stockactuel =
          parseInt(panier[index].stock) -
          parseInt(panier[index].product_quantity);
        const totalsoldactuel =
          parseInt(panier[index].total_sold) +
          parseInt(panier[index].product_quantity);
        await Axios.post("https://back-planetech.onrender.com/reducquant", {
          seller_id: 1,
          product_id: panier[index].product_id,
          stock: stockactuel,
          total_sold: totalsoldactuel,
          caisse: end_caisse,
        }).then((rets) => {
          console.log(rets.data, "inserted FASTER");
          setTimeout(() => {
            setCurrentStep(7);
          }, 1000);
        });
      }
      Axios.get("https://back-planetech.onrender.com/affiche_produit", {}).then(
        (response) => {
          if (response.data[0]) {
            console.log(response.data);
            dispatch(recupProduct(response.data));
            // localStorage.setItem("change_version", "non");
            setTimeout(() => {
              setCurrentStep(8);
            }, 1000);
            setTimeout(() => {
              setCurrentStep(9);
            }, 1000);
            setTimeout(() => {
              setCurrentStep(10);
            }, 1000);
            dispatch(deletepan());
            toast("Commande effectuer");
            setprogress(false);
            setTimeout(() => {
              router.push("/vente");
              // router.push('/vente', { scroll: false })
            }, 1000);
          }
        }
      );

      // }
    } else {
      //    aucun produit dans le panier
      toast("aucun produit dans le panier");
    }
  };

  const open = async () => {
    await openKkiapayWidget({
      // amount: 1,
      amount: totalprix,
      api_key: "f360c365307f9afa1c1cded51173173beef6f22b",
      // sandbox: true,
      // email: String(),
      email: "mevivital@gmail.com",
      // phone: "61940010",
      // name: "viyt",
      // theme: "#1586FD",
    });
  };

  function successHandler(response) {
    console.log(response);
    setresponse(response);
  }

  const colums1 = [
    {
      name: "Product Image",
      selector: (row) => (
        <div className="d-flex align-items-center">
          <img
            src={row.picture}
            // src="https://mdbootstrap.com/img/new/avatars/8.jpg"
            alt=""
            style={{
              width: "45px",
              height: "45px",
            }}
            className="rounded-circle"
          />
          {/* <div className="ms-3">
          <p className="fw-bold mb-1">John Doe</p>
          <p className="text-muted mb-0">
            john.doe@gmail.com
          </p>
        </div> */}
        </div>
      ),
    },
    {
      name: "Nom",
      selector: (row) => <p className="fw-normal mb-1">{row.product_name}</p>,
    },
    {
      name: "Quantite",
      selector: (row) => (
        <Changepan
          className="w-full"
          product_quantity={row.product_quantity}
          Stock={row.stock}
          id={row.id}
          prix_unite={row.unite_price}
        />
        // <span className="font-bold">{row.product_quantity}</span>
      ),
    },
    {
      name: "Montant",
      selector: (row) => (
        <span>{row.unite_price === 0 ? 0 : formatPrice(row.unite_price)}</span>
      ),
    },
    {
      name: "Total",
      selector: (row) => (
        <span>{row.total_price === 0 ? 0 : formatPrice(row.total_price)}</span>
      ),
    },
  ];
  const colums2 = [
    {
      name: "TOTAL",
      selector: (
        <div className="w-full justify-center items-center flex">
          <p className="mb-1 font-bold">Prix hors taxe</p>

          <p className="mb-1 font-bold">Quantité total</p>

          <p className="mb-1 font-bold">Prix total</p>
        </div>
      ),
    },
    {
      name: "Prix",
      selector: (
        <div className="w-full justify-center items-center flex">
          <p className="fw-normal mb-1">
            {totalprix === 0 ? 0 : formatPrice(totalprix)}
          </p>
          <p className="fw-normal mb-1">{totalquant}</p>
          <p className="fw-normal mb-1">
            {totalprix === 0 ? 0 : formatPrice(totalprix)}
          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    addKkiapayListener("success", successHandler);
    return () => {
      removeKkiapayListener("success");
    };
  }, []);

  useEffect(() => {
    if (response !== "") {
      // sendEmail();
      console.log("cest bon ");
      // envoiemail();
    }
  }, [response]);

  useEffect(() => {
    setprogressWidth((currentStep / totalSteps) * 100);
  }, [currentStep]);

  useEffect(() => {
    get_product();
    get_caisse();
    if (JSON.parse(localStorage.getItem("panier"))) {
      dispatch(recupPan(JSON.parse(localStorage.getItem("panier"))));
    }
    // if (panier[0]) {
    // }
  }, []);
  useEffect(() => {
    getpan();
  }, [panier]);

  return (
    <div className="px-4 md:px-60 min-h-screen space-y-8">
      <div>
        <Toaster />
      </div>
      <div className="w-full mt-10">
        {panier[0] && (
          <DataTable
            data={panier}
            columns={colums1}
            pagination
            selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input
                type="text"
                className="bg-white border-2 h-12 px-1 py-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 my-3"
                placeholder="Rechercher une commande"
                // value={search}
                // onChange={(e) => {
                //   setsearch(e.target.value);
                // }}
                // onChange={(e) => setserach(e.target.value)}
                // value={search}
              />
            }
          />
        )}
        {/* <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Product Image</th>
              <th scope="col">Nom</th>
              <th scope="col">Prix</th>
              <th scope="col">Quantité</th>
              <th scope="col">Total</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {   panier.map((data, i) => {
                 return (
                   <tr key={i}>
                     <td>
                       <div className="d-flex align-items-center">
                         <img
                           src={data.picture1}
                            src="https:mdbootstrap.com/img/new/avatars/8.jpg"
                           alt=""
                           style={{ width: "45px", height: "45px" }}
                           className="rounded-circle"
                         />
                       
                       </div>
                     </td>
                     <td>
                       <p className="fw-normal mb-1">{data.product_name}</p>
                     </td>
                     <td>
                       <span>
                         {data.unite_price === 0
                           ? 0
                           : formatPrice(data.unite_price)}
                       </span>
                     </td>
                     <td>
                      
                     </td>
                     <td>
                       <span>
                         {data.total_price === 0
                           ? 0
                           : formatPrice(data.total_price)}
                       </span>
                     </td>
                   </tr>
                 );})}
          </MDBTableBody>
        </MDBTable> */}
      </div>
      <div className="w-full md:px-96 flex justify-center items-center ">
        {panier[0] && (
          <div className="w-full flex-col flex justify-center items-center">
            <div className="w-full justify-center items-center flex flex-col mt-4">
              <div className="w-full justify-between items-center flex mb-4">
                <p className="mb-1 font-bold">Prix hors taxe</p>
                <p className="fw-normal mb-1">
                  {totalprix === 0 ? 0 : formatPrice(totalprix)}
                </p>
              </div>
              <hr className="border-2 border-gray-600 w-full" />
            </div>
            <div className="w-full justify-center items-center flex flex-col mt-4">
              <div className="w-full justify-between items-center flex mb-4">
                <p className="mb-1 font-bold">Quantité total</p>
                <p className="fw-normal mb-1">{totalquant}</p>
              </div>
              <hr className="border-2 border-gray-600 w-full" />
            </div>
            <div className="w-full justify-center items-center flex flex-col mt-4">
              <div className="w-full justify-between items-center flex mb-4">
                <p className="mb-1 font-bold">Prix total</p>
                <p className="fw-normal mb-1">
                  {totalprix === 0 ? 0 : formatPrice(totalprix)}
                </p>
              </div>
              <hr className="border-2 border-gray-600 w-full" />
            </div>
          </div>
          // <DataTable
          //   // data={panier}
          //   columns={colums2}
          //   pagination
          //   selectableRows
          //   fixedHeader
          //   selectableRowsHighlight
          //   highlightOnHover
          //   subHeader
          //   subHeaderComponent={
          //     <input
          //       type="text"
          //       className="bg-white border-2 h-12 px-1 py-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 my-3"
          //       placeholder="Rechercher une commande"
          //       // value={search}
          //       // onChange={(e) => {
          //       //   setsearch(e.target.value);
          //       // }}
          //       // onChange={(e) => setserach(e.target.value)}
          //       // value={search}
          //     />
          //   }
          // />
        )}
        {/* <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">TOTAL</th>
              <th scope="col">Prix</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>
                <p className="mb-1 font-bold">Prix hors taxe</p>
              </td>
              <td>
                <p className="fw-normal mb-1">
                  {totalprix === 0 ? 0 : formatPrice(totalprix)}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 font-bold">Quantité total</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{totalquant}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 font-bold">Prix total</p>
              </td>
              <td>
                <p className="fw-normal mb-1">
                  {totalprix === 0 ? 0 : formatPrice(totalprix)}
                  
                </p>
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable> */}
      </div>
      <div className="w-full justify-center items-center flex ">
        {progress ? (
          <>
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
            </div>
          </>
        ) : (
          <Button
            color="green"
            // onClick={() => dispatch(vider())}
            onClick={() => envoi1()}
          >
            Proceder au paiement
          </Button>
        )}
      </div>
    </div>
  );
}
