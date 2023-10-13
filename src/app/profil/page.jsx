"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@material-tailwind/react";

export default function page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/profil");
    },
  });
  const [change, setchange] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  return (
    <div className="w-full justify-center items-center px-4 py-4">
      <span>En conception</span>
    </div>
    // <div className="px-4 min-h-screen flex justify-center items-center select-none">
    //   <div className="border-b-2 block md:flex">
    //     <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md space-y-4">
    //       <div className="flex w-full items-center justify-between">
    //         <span className="text-xl font-semibold block">Admin Profile</span>
    //         <div onClick={() => setchange(!change)}>
    //           <Button>Edit</Button>
    //         </div>
    //       </div>

    //       {/* <span className="text-gray-600">
    //       Cette information est secrète alors soyez prudent
    //       </span> */}
    //       <div className="w-full flex justify-center">
    //         <img
    //           id="showImage"
    //           className="max-w-xs w-52 h-52 rounded-full items-center object-cover"
    //           src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
    //           alt=""
    //         />
    //       </div>
    //     </div>

    //     <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
    //       <div className="rounded shadow p-6 space-y-0">
    //         <div className="pb-6">
    //           {change ? (
    //             <input
    //               type="text"
    //               className="bg-white border-2 h-12 px-1 py-2 my-4 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
    //               placeholder="Nom d'utilisateur"
    //               value={username}
    //               onChange={(e) => {
    //                 setusername(e.target.value);
    //               }}
    //               // onChange={(e) => setserach(e.target.value)}
    //               // value={search}
    //             />
    //           ) : (
    //             <div className="w-full flex flex-col space-y-4">
    //               <span className="w-full justify-start items-center text-start font-bold text-black">
    //                 Username
    //               </span>
    //               <span className="text-gray-300 font-semibold">
    //                 {/* {session?.user  ? session?.user : "aucun mot de passe"} */}
    //                 efj{" "}
    //               </span>
    //             </div>
    //           )}
    //           {change ? (
    //             <input
    //               type="password"
    //               className="bg-white border-2 h-12 px-1 py-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
    //               placeholder="Mot de passe"
    //               value={password}
    //               onChange={(e) => {
    //                 setpassword(e.target.value);
    //               }}
    //               // onChange={(e) => setserach(e.target.value)}
    //               // value={search}
    //             />
    //           ) : (
    //             <div className="w-full flex flex-col space-y-4">
    //               <span className="w-full justify-start items-center text-start font-bold text-black">
    //                 password
    //               </span>
    //               <span className="text-gray-300 font-semibold">
    //                 {session?.password
    //                   ? session?.password
    //                   : "aucun mot de passe"}
    //               </span>
    //             </div>
    //           )}
    //         </div>
    //         <span className="text-gray-600 pt-4 block opacity-70">
    //           Informations de connexion personnelles de votre compte
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
