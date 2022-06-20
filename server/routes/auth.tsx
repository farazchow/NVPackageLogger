import { NextFunction, Request, Response } from "express";
const express = require("express");
const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
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
