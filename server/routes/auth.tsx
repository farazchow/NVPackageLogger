import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { user } from "../models/user";
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

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("user currently signed in is", req.user);
  next();
  console.log("finished calling next!");
});

export function requireLogin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(
    "requiring login",
    req.user,
    "user logged in: ",
    req.isAuthenticated()
  );
  return req.isAuthenticated() ? next() : res.redirect("/login");
}

export function requireLogout(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(
    "requiring logout",
    req.user,
    "user logged out: ",
    !req.isAuthenticated()
  );
  return !req.isAuthenticated() ? next() : res.redirect("/");
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const admins = [ACCESS.DESKCAPTAIN, ACCESS.DESKMANAGER, ACCESS.DESKMANAGER];
  return req.user && admins.includes((req as any).user.accessLevel)
    ? next()
    : res.redirect("/unauthorized");
}

async function signUp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { firstName, lastName, email, password } = req.body;
  const exists = await User.exists({ email: email });
  console.log("signup from post", req.body);
  if (exists) {
    // we just redirect if a user exists -> TODO: throw error instead
    return res.redirect("/login");
  }

  bcrypt.genSalt(10, function (err: Error, salt: number) {
    if (err) return next(err);
    bcrypt.hash(password, salt, async function (err: Error, hash: any) {
      if (err) return next(err);

      const newAdmin = new User({
        firstName,
        lastName,
        email,
        createdAt: Date.now(),
        happinessLevel: Math.random() * 10,
        password: hash,
      });

      newAdmin
        .save()
        .then(() => login(req, res, next))
        .catch((err: Error) => {
          console.log("Error received while trying to signup"); // TODO: is this what we want? consider trying to log in again
        });
    });
  });
}

function login(req: Request, res: Response, next: NextFunction): void {
  console.log("post login", req.body);
  // regnerate session because of advice of https: stackoverflow.com/questions/6928648/what-is-the-point-of-unsetting-the-cookie-during-a-logout-from-a-php-session
  req.session.regenerate((err: Error) => {
    if (err) {
      console.log(
        "Error received while trying to regenerate session for login" // TODO: add error handling
      );
    }
    passport.authenticate("local", {
      successRedirect: "/success",
      failureRedirect: "/login?error=true",
      failWithError: true,
    })(req, res, next);
  });
}

function logout(req: Request, res: Response, next: NextFunction): void {
  // remove cookies + session data; https: stackoverflow.com/questions/6928648/what-is-the-point-of-unsetting-the-cookie-during-a-logout-from-a-php-session
  console.log("attempting to logout user", req.user);
  // We login using cookies so calling doing this is effectively the same
  req.session.destroy((err: Error): {} => {
    res.clearCookie("connect.sid", { path: "/" });
    req.logOut((err: Error) => {});

    if (err) {
      return res.send({ error: "Logout error" }); // TODO: try logging out again (need to cap this so doesn't lead to infinite loop)
    }

    return res.send({});
  });
}

router.post("/signup", requireLogout, signUp);

// Login
router.post("/login", requireLogout, login);

// Logout
router.post("/logout", requireLogin, logout);

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  // TODO: ensure request is from shib-session.php and nowhere else
  const { kerb } = req.query;
  console.log("kerb is", kerb);

  if (!kerb) return res.redirect("https://nvdesk.mit.edu/Session");

  const email = kerb + "@mit.edu";

  User.findOne({ kerb }, (err: Error, user: user) => {
    if (!user) {
      // make a new worker
      const newUser = new User({
        kerb,
        email,
        accessLevel: ACCESS.DESKWORKER,
      });

      newUser.save().catch((err: Error) => {
        console.log("Error received while trying to signup"); // TODO: is this what we want? consider trying to log in again
      });
    }

    (req.session as any).user = user;
    return res.redirect(302, "/");
  });
});

router.get("/whoami", (req: Request, res: Response, next: NextFunction) => {
  console.log("whoamis", (req.session as any).user);
  return (req.session as any).user
    ? res.send((req.session as any).user)
    : res.send(null);
});

router.get(
  "/unauthorized",
  (req: Request, res: Response, next: NextFunction) => {
    console.log(
      "Oops! You cannot authorize this page. Will redirect you in 5 seconds.",
      req.user
    );

    setTimeout(() => {
      res.redirect("/"), 5000;
    });
  }
);

module.exports = router;
