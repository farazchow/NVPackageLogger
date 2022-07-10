// https:github.com/saintedlama/passport-local-mongoose
// https://www.youtube.com/watch?v=W5Tb1MIeg-I&ab_channel=TylerPotts

const bcrypt = require("bcrypt");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

import { Callback } from "mongoose";
import { User, UserInterface } from "../models/user";

export let PassportUser: UserInterface &
  typeof User & { id: string; email: string };

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      usernameCaseInsensitive: true,
    },

    function (
      email: string,
      password: string,
      done: (
        err: Error | null,
        user?: typeof PassportUser | false,
        info?: { message: string }
      ) => any
    ) {
      console.log("from locale start", email, password);
      // console.log(User.findById(email: email))
      User.findOne(
        { email: email },
        function (err: Error, user: typeof PassportUser) {
          if (err) return done(err);
          if (!user)
            return done(null, false, { message: "Incorrect username." });

          bcrypt.compare(
            password,
            user.password,
            function (err: any, res: any) {
              if (err) return done(err);
              if (res === false)
                return done(null, false, { message: "Incorrect password." });

              return done(null, user);
            }
          );
        }
      );
    }
  )
);

passport.serializeUser(function (user: typeof PassportUser, done: Callback) {
  done(null, user.id);
});

passport.deserializeUser(function (id: string, done: Callback) {
  User.findById(id, function (err: Error, user: typeof PassportUser) {
    done(err, user);
  });
});
