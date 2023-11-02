import React from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "../components";
import "../styles/globals.css";
import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
