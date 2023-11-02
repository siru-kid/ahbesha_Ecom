import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div class="container-fluid sticky-top">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light p-0">
          <a href="index.html" class="navbar-brand logo">
            <p className="">
              <Link href="/">
                <img
                  src="/logo/l.png"
                  alt="Azmarino Shopping"
                  className="logo-image"
                />
              </Link>
            </p>
          </a>
          <button
            type="button"
            class="navbar-toggler ms-auto me-0"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto">
              <a href="/" class="nav-item nav-link active">
                Home
              </a>

              <a href="product/habesha-gewelery" class="nav-item nav-link">
                Products
              </a>

              <a href="/" class="nav-item nav-link">
                Contact
              </a>
              <Link href="/signin">
                <a class="nav-item nav-link signin-link">Sign-In</a>
              </Link>
              <div className="auth-cart-container">
                <button
                  type="button"
                  className="cart-icon"
                  onClick={() => setShowCart(true)}
                >
                  <AiOutlineShopping />
                  <span className="cart-item-qty">{totalQuantities}</span>
                </button>
              </div>

              {showCart && <Cart />}
            </div>
          </div>
        </nav>
      </div>
      <style jsx>{`
        .navbar-nav .nav-item:not(:last-child) {
          margin-right: 20px;
        }

        .signin-link {
          font-weight: bold;
          color: #007bff; /* Blue color */
          text-decoration: none;
          transition: color 0.3s;
        }

        .signin-link:hover {
          color: red; /* Darker color on hover */
        }

        .logo-image {
          max-width: 150px;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
