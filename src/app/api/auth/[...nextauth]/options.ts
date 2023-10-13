import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import { useDispatch, useSelector } from "react-redux";
// import Axios from "axios";
// import { setCredentials } from "@/redux/features/TriggerSlice";

// const dispatch = useDispatch();

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Nom d'utilisateur:",
          type: "text",
          placeholder: "",
        },
        password: {
          label: "Mot de passe:",
          type: "password",
          placeholder: "",
        },
      },
      async authorize(credentials, req) {
        // const { username, password } = credentials as {
        //   username: string;
        //   password: string;
        // };
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = {
          id: "1",
          name: "planetechsarl",
          password: "planetechsarl",
        };
        // Axios.post("https://back-planetech.onrender.com/login", {
        //   username: credentials?.username,
        //   password: credentials?.password,
        // }).then((response) => {
        //   // console.log(response);
        //   if (!response.data.auth) {
        //     // setloginStatus(false);
        //     // console.log(response.data);
        //     if (response.data.message === "L'utilisateur n'existe pas") {
        //       // if(response.data.error === "L'utilisateur n'existe pas"){
        //       return null;
        //     } else if (response.data.message === "Mauvaise combinaison") {
        //       // }else if(response.data.error === "Mauvaise combinaison"){
        //       return null;
        //     }
        //   } else {
        //     dispatch(
        //       setCredentials({
        //         userId: response.data.result[0].id,
        //         username: response.data.result[0].username,
        //         auth: response.data.auth,
        //       })
        //     );
        //     localStorage.setItem("authentificator", String(response.data.auth));
        //     return {
        //       userId: response.data.result[0].id,
        //       username: response.data.result[0].username,
        //       auth: response.data.auth,
        //     };
        //   }
        // });

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
