import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from ".";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <img
            src="/logo/l.png"
            alt="Azmarino Shopping"
            className="logo-image"
          />
        </Link>
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
          <Link href="/signin">
            <button className="auth-link-button">SignIn</button>
          </Link>
        </div>
      </div>

      {showCart && <Cart />}

      <style jsx>{`
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-image {
          max-width: 150px;
        }

        .auth-cart-container {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .auth-button {
          display: flex;
          gap: 20px;
        }

        .auth-link-button {
          background-color: #dcdcdc;
          color: black;
          border: 1px solid white;
          transition: background-color 1s, font-size 1s;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
