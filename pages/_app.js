import React from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "../components";
import "../styles/globals.css";
import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Handle navigation to the signup page
  const handleSignup = () => {
    router.push("/signUpPage");
  };

  // Handle navigation to the signin page
  const handleSignin = () => {
    router.push("/signin");
  };

  return (
    <StateContext>
      <Layout handleSignup={handleSignup} handleSignin={handleSignin}>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
