import { NextFunction, Request, Response, Router } from "express";
const express = require("express");
const router: Router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/user");

router.use((req: Request, res: Response, next: NextFunction) => {
  // console.log("Time: ", Date.now());
  console.log("reached router auth middleware", "calling next function");
  next();
  console.log("finished calling next!");
  // User.find({ name: "Paul" }).then((users: any) => {
  //   console.log(users);
  //   res.send(users);
  // });
});

// This defines the home page the this route; route would not work without it
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("get request reached home page");
  res.send("Congrats, you've reached the home page of the auth route");
  next();
  console.log("finished calling next from get");
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("post request reached home page");
  res.send("Congrats, you've reached the home page of the auth route");
  next();
  console.log("finished calling next from get");
});

router.get("/auth", (req: Request, res: Response, next: NextFunction) => {
  console.log("Sending auth data back to you!");
  res.json({ message: "Hello from Authorization! Are you authorized?" });
  next();
  console.log("finished calling next from get");
});

module.exports = router;
