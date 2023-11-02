import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head"; // Import the next/head component

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Sign-in failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Include the styles within the head section */}
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
              height: 70vh; /* Set height to 70% of the viewport height */
              margin: 0 auto; /* Center the form horizontally */
              padding: 20px;
              border-radius: 20px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
            }
            .custom-container h1 {
              text-align: center;
            }
            .custom-container form {
              margin-top: 20px; /* Adjust the top margin as needed */
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
              margin: 20px 0; /* Adjust the top margin as needed */
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
            .noaccount{
              color:blue;
            }
          `}
        </style>
        <title>SignIn</title>
      </Head>

      <div className="container custom-container">
        <h1>Sign In</h1>

        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your Password"
              required
            />
          </div>

          <div className="button-container">
            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
            <a
              className="btn btn-google btn-block text-uppercase btn-outline"
              href="./auth/google"
            >
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" />{" "}
              Sign In Using Google
            </a>
          </div>
        </form>

        <p className="mt-2 pl-2 ">
          Don't have an account?{" "}
          <a href="/signup" className="noaccount">
            Register here
          </a>
        </p>
      </div>
    </>
  );
}
