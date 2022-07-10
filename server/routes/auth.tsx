import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
const express = require("express");
const bcrypt = require("bcrypt");

const router: Router = express.Router();
const { User } = require("../models/user");

export enum ACCESS {
  DESKWORKER = "DESKWORKER",
  DESKCAPTAIN = "DESKCAPTAIN",
  DESKMANAGER = "DESKMANAGER",
  RESIDENT = "RESIDENT",
}

export function requireLogin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log("requiring login", req.user);
  return req.isAuthenticated() ? next() : res.redirect("/login");
}

export function requireLogout(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log("requiring logout", req.user);
  return !req.isAuthenticated() ? next() : res.redirect("/");
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const admins = [ACCESS.DESKCAPTAIN, ACCESS.DESKMANAGER, ACCESS.DESKMANAGER];
  return (req as any).user && admins.includes((req as any).user.accessLevel)
    ? next()
    : res.redirect("/unauthorized");
}

router.use((req: Request, res: Response, next: NextFunction) => {
  // console.log("Time: ", Date.now());
  console.log("reached router auth middleware", "calling next function");
  next();
  console.log("finished calling next!");
});

router.post(
  "/signup",
  requireLogout,
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;
    const exists = await User.exists({ email: email });
    console.log("signup from post", req.body);
    if (exists) {
      res.redirect("/login");
      return;
    }

    bcrypt.genSalt(10, function (err: Error, salt: number) {
      if (err) return next(err);
      bcrypt.hash(password, salt, function (err: Error, hash: any) {
        if (err) return next(err);

        const newAdmin = new User({
          firstName,
          lastName,
          email,
          createdAt: Date.now(),
          happinessLevel: Math.random() * 10,
          password: hash,
        });

        newAdmin.save().then(() => res.redirect("/login"));
      });
    });
  }
);

router.post(
  "/login",
  requireLogout,
  (
    req: Request & any,
    res: Response & Record<any, any>,
    next: NextFunction
  ) => {
    console.log("added attrbutes");
    console.log("post login", req.body);
    passport.authenticate(
      "local",
      {
        successRedirect: "/sucesssss",
        failureRedirect: "/login?error=true",
        // failWithError: true,
      }
      // (err: Error, user: any, info: any) => {
      //   console.log(`failed because of erorr: ${err}, ${user}, ${info}`);
      //   console.log(info);
      //   // req.session.cookie = "new cooke";
      //   // // req.session.id = "new id!";
      //   res.sendStatus(200);
      // }
    )(req, res, next);
    next();
  }
);

router.get(
  "/login?error=true",
  (req: Request, res: Response & Record<any, any>) => {
    console.log("login get request", res.body);
    console.log("req params", req.params);
    res.send();
  }
);

router.get(
  "/unauthorized",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Cannot authorize this page. Redirecting soon", req.user);

    setTimeout(() => {
      res.redirect("/login"), 5000;
    });
  }
);

module.exports = router;
