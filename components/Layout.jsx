import React from "react";
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, handleSignup, handleSignin }) => {
  return (
    <div className="layout">
      <Head>
        <title>Azmarino Store</title>
      </Head>
      <header>
        <Navbar handleSignup={handleSignup} handleSignin={handleSignin} />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
