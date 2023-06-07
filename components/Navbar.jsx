import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Azmarino Shoping</Link>
      </p>

      <div className="auth-cart-container">
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>

        <div className="auth-button">
          <Link href="/signUpPage">
            <button className="auth-link-button">SignUp</button>
          </Link>
          <Link href="/signInPage">
            <button className="auth-link-button">SignIn</button>
          </Link>
        </div>
      </div>

      {showCart && <Cart />}

      <style jsx>{`
        .auth-cart-container {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .auth-button {
          display: flex;
          gap: 10px;
        }

        .auth-link-button {
          background-color: #dcdcdc;
          color: black;
          border: 1px solid white;
          border-radius: 5px;
          transition: background-color 1s, font-size 1s;
        }
        .auth-button :hover {
          background-color: #f02d34;
          font-size: 18px;
          color: white;
          border: 1px solid gray;
        }

        .cart-icon {
          /* Add your cart icon styling here */
        }

        .cart-item-qty {
          /* Add your cart item quantity styling here */
        }
      `}</style>
    </div>
  );
};

export default Navbar;
