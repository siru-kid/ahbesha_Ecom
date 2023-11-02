const express = require("express");
const path = require("path");
const collections = require("./registerSchema");
const bycrypt = require("bcryptjs");
const session = require("express-session");
const mongoStore = require("connect-mongo");
require("./api/auth");
const app = express();

const Joi = require("joi");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

require("dotenv").config();

app.set("views", path.join(__dirname, "views", "registration"));
app.set("view engine", "ejs");

app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist")
);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "112233aabbccdd",
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/habeshaecommerceUser",
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 50000,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

//use password to find out if the login is authenticated or not or if he/she is Admin or user
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await collections.findOne({ username });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const passwordMatch = await bycrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: "Wrong password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

app.get("/", (req, res) => {
  res.render("signin");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//google authentication
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

//google auth
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  async function (req, res) {
    const articles = await BlogPost.find().sort({ createdAt: -1 });
    res.render("index", { articles });
  }
);

//signup Post method
app.post("/signup", async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);

    if (error) {
      return res.status(400).send("Invalid request data");
    }

    req.session.username = value.username;
    const data = {
      username: value.username,
      email: value.email,
      password: await bycrypt.hash(value.password, 10),
    };

    await collections.insertMany([data]);
    res.render("signin");
  } catch (error) {
    res.status(500).send("An error occurred during signup");
  }
});

//login post
app.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/signin");
    }

    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }

      res.render("index");
    });
  })(req, res, next);
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }

    res.redirect("/signin");
  });
});

app.listen(3000, () => {
  console.log("server connected on port 3000");
});
