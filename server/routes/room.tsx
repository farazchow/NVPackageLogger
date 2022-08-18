import { NextFunction, Request, Response } from "express";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Room } = require("../models/room");

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("hello - middleware here");
  console.log("Time: ", Date.now());
  next();
});

// This defines the home page the this route; route would not work without it
router.get("/", (req: Request, res: Response) => {
  console.log("reached home page");
  res.send("Congrats, you've reached the home page of the auth route");
});

router.get("/getRooms", (req: Request, res: Response) => {
  console.log("Sending room data back to you!");

  Room.find({}).then((result: any) => console.log("All rooms: ", Room));
});

router.post("/createRoom", (req: any, res: Response) => {
  console.log("Creating Room");

  const newRoom = new Room({
    residents: req.body.residents,
    number: req.body.number,
    keycode: req.body.keycode,
    size: req.body.size,
    status: req.body.status,
    keyAmount: req.body.keyAmount,
  });

  newRoom
    .save()
    .then((room: any) => res.send(room))
    .catch((err: any) => {
      console.log("error creating room", err);
      res.status(500).send({ message: "unknown error" });
    });
});
