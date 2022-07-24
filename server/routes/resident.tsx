import { NextFunction, Request, Response } from "express";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Resident } = require("../models/resident");

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

router.get("/getResident", (req: Request, res: Response) => {
  console.log("Sending resident data back to you!");
  Resident.find().then((resi: any) => {
    res.send(resi);
  });
});

router.post("/postResident", (req: any, res: Response) => {
  console.log("posting resident");
  const newResident = new Resident({
    studentId: req.body.id,
    resident: req.body.resident,
    room: req.body.room,
    year: req.body.year,
    homeAddress: req.body.homeAddress,
    forwardingAddress: req.body.forwardingAddress,
    date: req.body.date,
  });

  newResident
    .save()
    .then((resi: any) => res.send(resi))
    .catch((err: any) => {
      console.log("error posting resident", err);
      res.status(500).send({ message: "unknown error" });
    });
});

module.exports = router;
