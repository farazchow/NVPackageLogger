// https:github.com/saintedlama/passport-local-mongoose
// https://www.youtube.com/watch?v=W5Tb1MIeg-I&ab_channel=TylerPotts

const bcrypt = require("bcrypt");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

// import { User } from "express";
import { Callback } from "mongoose";
import { User, UserInterface } from "../models/user";

type MongooseUser = typeof User;

export interface PassportUser
  extends Express.User,
    UserInterface,
    MongooseUser {
  id: string;
  email: string;
  password: string;
}

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
        user?: PassportUser | boolean,
        info?: { message: string }
      ) => void
    ) {
      console.log(
        `Local Strategy: email is, ${email}\npassword is ${password}`
      );
      // console.log(User.findById(email: email))
      User.findOne({ email }, function (err: Error, user: PassportUser) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "Incorrect username." });

        bcrypt.compare(
          password,
          user.password,
          function (err: Error, res: boolean) {
            if (err) return done(err);
            if (res === false)
              return done(null, false, { message: "Incorrect password." });

            return done(null, user);
          }
        );
      });
    }
  )
);

passport.serializeUser(function (user: PassportUser, done: Callback) {
  done(null, user.id);
});

passport.deserializeUser(function (id: string, done: Callback) {
  User.findById(id, function (err: Error, user: Express.User) {
    done(err, user);
  });
});
