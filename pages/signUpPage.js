import React, { useState } from "react";
import { connectToDatabase } from "./db";

const signUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Perform validation on the client side
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const client = await connectToDatabase();
      const db = client("habeshaEcomerce");

      // Check if the user already exists
      const existingUser = await db.collection("User").findOne({ email });
      if (existingUser) {
        setError("Email already exists.");
        return;
      }

      // Create a new user
      await db.collection.insertOne({ email, password });

      // Redirect to the login page or dashboard
      window.location.href = "/login";
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignup} action="/signUp">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default signUpPage;
