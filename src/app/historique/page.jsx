"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import {
  recupcaisse,
  recupcommands,
  recupcommands_validation,
} from "@/redux/features/productSlice";

import { Button } from "@material-tailwind/react";
// import CurrencyFormat from "react-currency-format";
import Axios from "axios";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { dateParser1 } from "@/components/Utils";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { formatPrice } from "../../components/Utilscamp";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#page");
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(239,242,241)",
  boxShadow: 24,
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    bgcolor: "rgb(239,242,241)",
    transform: "translate(-50%, -50%)",
  },
};

const status_commade = [
  {
    id: 1,
    libeller: "En attente",
  },
  {
    id: 2,
    libeller: "En cours",
  },
  {
    id: 3,
    libeller: "Terminer",
  },
  {
    id: 4,
    libeller: "Annuler",
  },
];
export default function page() {
  const dispatch = useDispatch();
  let histo_command_valida = useSelector(
    (state) => state.product.commands_validation
  );
  let caisse = useSelector((state) => state.product.caisse);
  let histo_command = useSelector((state) => state.product.commands);
  const [progress, setprogress] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [invoice, setinvoice] = useState("");
  const [status, setstatus] = useState("");
  const [status1, setstatus1] = useState("");
  const [prixtotal, setprixtotal] = useState(0);
  const [search, setsearch] = useState("");
  const [filtered, setfiltered] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const totalSteps = 10;
  const [currentStep, setCurrentStep] = useState(0);
  // Calculer la largeur de la barre de progression en pourcentage
  const [progressWidth, setprogressWidth] = useState(
    (currentStep / totalSteps) * 100
  );

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/historique");
    },
  });

  useEffect(() => {
    setprogressWidth((currentStep / totalSteps) * 100);
  }, [currentStep]);

  const get_commands = () => {
    Axios.get("https://back-planetech.onrender.com/get_commands", {}).then(
      (response) => {
        if (response.data[0]) {
          console.log(response.data);
          dispatch(recupcommands(response.data));
          // localStorage.setItem("change_version", "non");
        }
      }
    );
  };
  const get_commands_validation = () => {
    Axios.get(
      "https://back-planetech.onrender.com/get_commands_validation",
      {}
    ).then((response) => {
      if (response.data[0]) {
        console.log(response.data);
        dispatch(recupcommands_validation(response.data));
        setfiltered(response.data);
        // localStorage.setItem("change_version", "non");
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

  const majstatut = async (n) => {
    if (status == status1) {
      toast("Passez à un autre status avant de la mettre à jour");
    } else {
      if (status == 2 && n == 1) {
        toast("Vous ne pouvez pas passez à un status anterieur !");
      } else if (status == 3 && n == 2) {
        toast("Vous ne pouvez pas passez à un status anterieur !");
      } else if (status == 4 && n == 3) {
        toast("Vous ne pouvez pas passez à un status anterieur !");
      } else {
        setprogress(true);
        setTimeout(() => {
          setCurrentStep(1);
        }, 500);
        setTimeout(() => {
          setCurrentStep(2);
        }, 1000);
        setTimeout(() => {
          setCurrentStep(3);
        }, 1000);

        Axios.post("https://back-planetech.onrender.com/majstatut", {
          invoice: invoice,
          status: n,
          seller_id: 1,
        }).then((ret) => {
          console.log(ret.data, "majstatus");
          if (ret.data == "success") {
            if (n == 2) {
              if (n == 2 && status == 1) {
                setTimeout(() => {
                  setCurrentStep(4);
                }, 1000);
                console.log("ici");

                // if (progress) {
                const last_caisse = caisse;
                console.log(last_caisse);
                const end_caisse = parseInt(last_caisse) + parseInt(prixtotal);
                console.log(end_caisse);
                for (let index = 0; index < histo_command.length; index++) {
                  if (histo_command[index].invoice == invoice) {
                    const stockcalculer =
                      parseInt(histo_command[index].stock) -
                      parseInt(histo_command[index].product_quantity);
                    const soldtotal =
                      parseInt(histo_command[index].total_sold) +
                      parseInt(histo_command[index].product_quantity);
                    Axios.post(
                      "https://back-planetech.onrender.com/reducquant",
                      {
                        seller_id: 1,
                        product_id: histo_command[index].product_id,
                        stock: stockcalculer,
                        total_sold: soldtotal,
                        caisse: end_caisse,
                      }
                    ).then((rets) => {
                      console.log(rets.data);
                      setTimeout(() => {
                        setCurrentStep(5);
                      }, 1000);
                    });
                  }
                }
                console.log("labas");

                get_commands();
                get_commands_validation();
                setTimeout(() => {
                  setCurrentStep(6);
                }, 1000);
                setTimeout(() => {
                  setCurrentStep(7);
                }, 1000);
                getCaisse2();
              }
            } else if (n == 3) {
              setTimeout(() => {
                setCurrentStep(4);
              }, 1000);
              setTimeout(() => {
                setCurrentStep(5);
              }, 1000);
              get_commands();
              get_commands_validation();
              setTimeout(() => {
                setCurrentStep(6);
              }, 1000);
              setTimeout(() => {
                setCurrentStep(7);
              }, 1000);
              getCaisse2();
            } else if (n == 4) {
              setTimeout(() => {
                setCurrentStep(4);
              }, 1000);
              setTimeout(() => {
                setCurrentStep(5);
              }, 1000);
              get_commands();
              get_commands_validation();
              setTimeout(() => {
                setCurrentStep(6);
              }, 1000);
              setTimeout(() => {
                setCurrentStep(7);
              }, 1000);
              getCaisse2();
            }
          }
        });
      }
    }
  };

  // const getCaisse1 = () => {
  //   Axios.post("https://backend-shopp.versatileskills.space/caisse_val", {
  //     id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
  //   }).then((ret) => {
  //     console.log(ret.data);
  //     dispatch(setcaisse(ret.data));
  //     setTimeout(() => {
  //       setCurrentStep(7);
  //     }, 1000);
  //     add_tresorerie();
  //   });
  // };
  const getCaisse2 = () => {
    setTimeout(() => {
      setCurrentStep(8);
    }, 1000);
    get_caisse();
    setTimeout(() => {
      setCurrentStep(9);
    }, 1000);
    setTimeout(() => {
      setCurrentStep(10);
    }, 1000);
    setTimeout(() => {
      setprogress(false);
      toast("Status mis à jour avec  succès");
      closeModal();
    }, 2000);
  };

  useEffect(() => {
    setfiltered(histo_command_valida);
    get_caisse();
  }, []);

  useEffect(() => {
    const result = histo_command_valida.filter((it) => {
      return it.invoice.toLowerCase().match(search.toLowerCase());
    });
    setfiltered(result);
  }, [search]);

  const colums = [
    {
      name: "id",
      selector: (row) => (
        <span
          className="cursor-pointer select-none"
          onClick={() => {
            openModal();
            setinvoice(row.invoice);
            setstatus(row.status_id_command);
            setstatus1(row.status_id_command);
            setprixtotal(row.total_price);
          }}
        >
          {row.invoice}
        </span>
      ),
    },
    {
      name: "data",
      selector: (row) => (
        <span
          className=" cursor-pointer select-none"
          onClick={() => {
            openModal();
            setinvoice(row.invoice);
            setstatus(row.status_id_command);
            setstatus1(row.status_id_command);
            setprixtotal(row.total_price);
          }}
        >
          {dateParser1(row.date)}
        </span>
      ),
    },
    {
      name: "Quantite",
      selector: (row) => (
        <span
          className="font-bold cursor-pointer select-none"
          onClick={() => {
            openModal();
            setinvoice(row.invoice);
            setstatus(row.status_id_command);
            setstatus1(row.status_id_command);
            setprixtotal(row.total_price);
          }}
        >
          {row.total_quantity}
        </span>
      ),
    },
    {
      name: "Montant",
      selector: (row) => (
        <span
          className="text-red-600 cursor-pointer select-none"
          onClick={() => {
            openModal();
            setinvoice(row.invoice);
            setstatus(row.status_id_command);
            setstatus1(row.status_id_command);
            setprixtotal(row.total_price);
          }}
        >
          {row.total_price === 0 ? 0 : formatPrice(row.total_price)}
        </span>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          {row.status_id_command == "1" ? (
            <div
              className="bg-yellow-300 px-3 py-2 rounded-xl flex items-end justify-center cursor-pointer select-none"
              onClick={() => {
                openModal();
                setinvoice(row.invoice);
                setstatus(row.status_id_command);
                setstatus1(row.status_id_command);
                setprixtotal(row.total_price);
              }}
            >
              {"En attente"}
            </div>
          ) : null}
          {row.status_id_command == "2" ? (
            <div
              className="bg-pink-300 px-3 py-2 rounded-xl flex items-end justify-center cursor-pointer text-white select-none"
              onClick={() => {
                openModal();
                setinvoice(row.invoice);
                setstatus(row.status_id_command);
                setstatus1(row.status_id_command);
                setprixtotal(row.total_price);
              }}
            >
              {"En cours"}
            </div>
          ) : null}
          {row.status_id_command == "3" ? (
            <div
              className="bg-green-500 px-3 py-2 rounded-xl flex items-end justify-center cursor-pointer text-white select-none"
              onClick={() => {
                openModal();
                setinvoice(row.invoice);
                setstatus(row.status_id_command);
                setstatus1(row.status_id_command);
                setprixtotal(row.total_price);
              }}
            >
              {"Terminer"}
            </div>
          ) : null}
          {row.status_id_command == "4" ? (
            <div
              className="bg-red-500 px-3 py-2 rounded-xl flex items-end justify-center cursor-pointer text-white select-none"
              onClick={() => {
                openModal();
                setinvoice(row.invoice);
                setstatus(row.status_id_command);
                setstatus1(row.status_id_command);
                setprixtotal(row.total_price);
              }}
            >
              {"Annuler"}
            </div>
          ) : null}
        </>
      ),
    },
  ];
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
        <span className="font-bold">{row.product_quantity}</span>
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
        // <>
        //   {row.status_id_command == "1" ? (
        //     <div
        //       className="bg-yellow-300 px-3 py-2 rounded-xl flex items-end justify-center cursor-pointer select-none"
        //       onClick={() => {
        //         openModal();
        //         setinvoice(row.invoice);
        //         setstatus(row.status_id_command);
        //         setstatus1(row.status_id_command);
        //         setprixtotal(row.total_price);
        //       }}
        //     >
        //       {"En attente"}
        //     </div>
        //   ) : null}
        //   {row.status_id_command == "2" ? (
        //     <div
        //       className="bg-pink-300 px-3 py-2 rounded-xl flex items-end justify-center cursor-pointer text-white select-none"
        //       onClick={() => {
        //         openModal();
        //         setinvoice(row.invoice);
        //         setstatus(row.status_id_command);
        //         setstatus1(row.status_id_command);
        //         setprixtotal(row.total_price);
        //       }}
        //     >
        //       {"En cours"}
        //     </div>
        //   ) : null}
        //   {row.status_id_command == "3" ? (
        //     <div
        //       className="bg-green-500 px-3 py-2 rounded-xl flex items-end justify-center cursor-pointer text-white select-none"
        //       onClick={() => {
        //         openModal();
        //         setinvoice(row.invoice);
        //         setstatus(row.status_id_command);
        //         setstatus1(row.status_id_command);
        //         setprixtotal(row.total_price);
        //       }}
        //     >
        //       {"Terminer"}
        //     </div>
        //   ) : null}
        //   {row.status_id_command == "4" ? (
        //     <div
        //       className="bg-red-500 px-3 py-2 rounded-xl flex items-end justify-center cursor-pointer text-white select-none"
        //       onClick={() => {
        //         openModal();
        //         setinvoice(row.invoice);
        //         setstatus(row.status_id_command);
        //         setstatus1(row.status_id_command);
        //         setprixtotal(row.total_price);
        //       }}
        //     >
        //       {"Annuler"}
        //     </div>
        //   ) : null}
        // </>
      ),
    },
  ];
  useEffect(() => {
    get_commands_validation();
    get_commands();
    console.log("lafa");
  }, []);

  return (
    <div className="w-full justify-start items-center space-y-4 py-4 px-4">
      <div>
        <Toaster />
      </div>
      <Header title={"Gestion des historiques"} user={session?.user} />
      <div>
        {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Modal> */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="flex flex-col w-full justify-start items-start space-y-4">
            <button onClick={closeModal} className="text-2xl text-red-700">
              <IoIosCloseCircle />
            </button>
            <div className="flex w-full">
              <div>
                <div className="my-2">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Status de la commmande
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={status1}
                      onChange={(e) => {
                        setstatus1(e.target.value);
                      }}
                    >
                      {status_commade.map((data, i) => {
                        return (
                          <FormControlLabel
                            key={i}
                            value={data.id}
                            control={<Radio />}
                            label={data.libeller}
                          />
                        );
                      })}
                      {/* <FormControlLabel
                        value="disabled"
                        disabled
                        control={<Radio />}
                        label="other"
                      /> */}
                    </RadioGroup>
                  </FormControl>
                </div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Liste des produits de la commande</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="w-full mt-10">
                      <DataTable
                        data={histo_command.filter((t) => t.invoice == invoice)}
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
                            placeholder="Rechercher un produit"
                            value={search}
                            onChange={(e) => {
                              setsearch(e.target.value);
                            }}
                            // onChange={(e) => setserach(e.target.value)}
                            // value={search}
                          />
                        }
                      />
                    </div>
                  </AccordionDetails>
                </Accordion>
                <div className="w-full flex justify-end items-end my-4">
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
                      onClick={() => majstatut(status1)}
                    >
                      Mettre à jour le status
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <DataTable
          data={filtered}
          columns={colums}
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
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
              // onChange={(e) => setserach(e.target.value)}
              // value={search}
            />
          }
        />
      </div>
    </div>
  );
}
