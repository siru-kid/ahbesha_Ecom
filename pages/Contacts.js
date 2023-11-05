import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Head from "next/head";
import emailjs from "@emailjs/browser";
require("dotenv").config();

export default function ContactsPage() {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const emailjsApiKey = process.env.EMAILJS_API_KEY;

  const handleChange = async (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_tuygd8o",
        "template_44jsmd9",
        {
          from_name: form.name,
          to_name: "Azmarino-shopping website",
          from_email: form.email,
          to_email: "sirakkidane94@gmail.com",
          message: form.message,
        },
        "wwh1J7YrNKhQx-jVz"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. We will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <style>
          {`
            .custom-container {
              width: 500px;
              height: 70vh;
              margin: 0 auto;
              padding: 20px;
              border-radius: 20px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
            }
            .custom-container h1 {
              text-align: center;
            }
            .custom-container form {
              margin-top: 20px;
              height: 70%; /* Set height to 70% of the container */
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .btn {
              border-radius: 2px;
              text-transform: capitalize;
              font-size: 15px;
              padding: 10px 19px;
              cursor: pointer;
            }
            .btn-google {
              color: #545454;
              background-color: #ffffff;
              box-shadow: 0 1px 2px 1px #ddd;
            }
            .or-container {
              align-items: center;
              color: #ccc;
              display: flex;
              margin: 20px 0;
            }
            .line-separator {
              background-color: #ccc;
              flex-grow: 5;
              height: 1px;
            }
            .or-label {
              flex-grow: 1;
              margin: 0 15px;
              text-align: center;
            }
            .button-container {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .noaccount {
              color: blue;
            }

            .footer{
              padding-top:210px;
            }
          `}
        </style>
        <title>Contacts</title>
      </Head>

      <div className="container custom-container">
        <h1>Contact Us</h1>

        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={form.name}
              id="name"
              onChange={handleChange}
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              className="form-control"
              id="message"
              cols="30"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          <div className="button-container">
            <button type="submit" className="btn btn-primary btn-block">
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>

        <div className="footer">
          <div className="dbox w-100 text-center ">
            <div className="icon d-flex align-items-center justify-content-center">
              <span className="fa fa-map-marker"></span>
            </div>
            <div className="text">
              <p>
                <span>Address:</span> 198 West 21th Street, bole 10 Addis ababa
              </p>
            </div>
          </div>

          <div className="dbox w-100 text-center">
            <div className="icon d-flex align-items-center justify-content-center">
              <span className="fa fa-phone"></span>
            </div>
            <div className="text">
              <p>
                <span>Phone:</span>{" "}
                <a href="tel://+251977169099">+251977169099</a>
              </p>
            </div>
          </div>

          <div className="dbox w-100 text-center">
            <div className="icon d-flex align-items-center justify-content-center">
              <span className="fa fa-paper-plane"></span>
            </div>
            <div className="text">
              <p>
                <span>Email:</span>{" "}
                <a href="azmarinoshopping@gmail.com">
                  azmarinoshopping@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="dbox w-100 text-center">
            <div className="icon d-flex align-items-center justify-content-center">
              <span className="fa fa-globe"></span>
            </div>
            <div className="text">
              <p>
                <span>Website</span> <a href="#">AzmarinoShopping.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
