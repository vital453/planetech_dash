"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import {
  recupcommands,
  recupcommands_validation,
} from "@/redux/features/productSlice";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import CurrencyFormat from "react-currency-format";
import Axios from "axios";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { dateParser1 } from "@/components/Utils";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";

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

export default function RecentOrder() {
  const dispatch = useDispatch();
  let histo_command_valida = useSelector(
    (state) => state.product.commands_validation
  );
  let histo_command = useSelector((state) => state.product.commands);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [invoice, setinvoice] = useState("");
  const [search, setsearch] = useState("");
  const [filtered, setfiltered] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const get_commands = () => {
    Axios.get("http://localhost:3004/get_commands", {}).then((response) => {
      if (response.data[0]) {
        console.log(response.data);
        dispatch(recupcommands(response.data));
      }
    });
  };
  const get_commands_validation = () => {
    Axios.get("http://localhost:3004/get_commands_validation", {}).then(
      (response) => {
        if (response.data[0]) {
          console.log(response.data);
          const result = response.data.filter((it) => {
            return it.status_id_command < 3;
          });
          setfiltered(result);
          dispatch(recupcommands_validation(result));
        }
      }
    );
  };

  useEffect(() => {
    setfiltered(histo_command_valida);
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
          }}
        >
          <CurrencyFormat
            value={row.total_price === 0 ? 0 : row.total_price}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" FCFA"}
            renderText={(value) => <span>{value}</span>}
          />
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
              }}
            >
              {"Annuler"}
            </div>
          ) : null}
        </>
      ),
    },
  ];
  useEffect(() => {
    get_commands_validation();
    get_commands();
    console.log("lafa");
  }, []);

  return (
    <div className="w-full col-span-1 relative p-4 border rounded-lg bg-white">
      <h1>Recent Order</h1>
      <div className="">
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
                      <MDBTable align="middle">
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
                          {histo_command[0] &&
                            histo_command
                              .filter((t) => t.invoice == invoice)
                              .map((data, i) => {
                                return (
                                  <tr key={i}>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <img
                                          src={data.picture}
                                          // src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                          alt=""
                                          style={{
                                            width: "45px",
                                            height: "45px",
                                          }}
                                          className="rounded-circle"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <p className="fw-normal mb-1">
                                        {data.product_name}
                                      </p>
                                    </td>
                                    <td>
                                      <CurrencyFormat
                                        value={
                                          data.unite_price === 0
                                            ? 0
                                            : data.unite_price
                                        }
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        suffix={" FCFA"}
                                        renderText={(value) => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </td>
                                    <td>
                                      <span className="font-bold">
                                        {data.stock}
                                      </span>
                                    </td>
                                    <td>
                                      <CurrencyFormat
                                        value={
                                          data.total_price === 0
                                            ? 0
                                            : data.total_price
                                        }
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        suffix={" FCFA"}
                                        renderText={(value) => (
                                          <span className="text-xl">
                                            {value}
                                          </span>
                                        )}
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                        </MDBTableBody>
                      </MDBTable>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </Modal>
        <DataTable
          data={filtered}
          columns={colums}
          pagination
          // selectableRows
          fixedHeader
          // selectableRowsHighlight
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
