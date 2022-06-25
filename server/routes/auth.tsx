import { NextFunction, Request, Response } from "express";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/user");

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  // next();

  User.find({ name: "Paul" }).then((users: any) => {
    console.log(users);
    res.send(users);
  });
});

// This defines the home page the this route; route would not work without it
router.get("/", (req: Request, res: Response) => {
  console.log("reached home page");
  res.send("Congrats, you've reached the home page of the auth route");
});

router.get("/auth", (req: Request, res: Response) => {
  console.log("Sending auth data back to you!");
  res.json({ message: "Hello from Authorization! Are you authorized?" });
});

module.exports = router;
