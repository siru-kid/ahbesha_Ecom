import nextConnect from "next-connect";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import User from "../registerSchema";
import "dotenv/config";

const handler = nextConnect();

handler.use(passport.initialize());
handler.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          const newUser = new User({
            googleId: profile.id,
          });
          await newUser.save();
          return done(null, newUser);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize and deserialize user functions
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Define your authentication routes here

export default handler;
