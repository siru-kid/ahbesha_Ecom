const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./db");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signUp");
});

app.post("/signUp", async (req, res) => {
  const data = {
    name: req.body.email,
    password: req.body.password,
  };
  await collection.insertMany([data]);

  res.render("home");
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.email });
    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("wrong password");
    }
  } catch {
    res.send("wrong details");
  }

  res.render("home");
});

app.listen(3000, (req, res) => {
  console.log("connected to the server");
});
