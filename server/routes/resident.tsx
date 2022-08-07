import { NextFunction, Request, Response } from "express";
import { useParams } from "react-router-dom";
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

router.get("/getResidents", (req: Request, res: Response) => {
  console.log("Sending resident data back to you!");

  const { checkedIn } = req.query;
  console.log("checked in is", checkedIn);

  Resident.find({ checkedIn: checkedIn === "true" }).then(
    (resident: typeof Resident[]) => {
      res.send(resident);
    }
  );
});

router.get("/getResidentById", (req: Request, res: Response) => {
  console.log("Sending getResident data back to you!");
  const { id } = req.query;
  console.log("id to find by is", id);
  Resident.findOne({ _id: id }).then((resi: any) => {
    console.log("resident sending backis", resi);
    res.send(resi);
  });
});

router.post("/postResident", (req: any, res: Response) => {
  console.log("posting resident");
  const newResident = new Resident({
    studentId: req.body.studentId,
    resident: req.body.resident,
    room: req.body.room,
    year: req.body.year,
    homeAddress: req.body.homeAddress,
    forwardingAddress: req.body.forwardingAddress,
    date: req.body.date,
    checkedIn: req.body.checkedIn,
  });

  newResident
    .save()
    .then((resi: any) => res.send(resi))
    .catch((err: any) => {
      console.log("error posting resident", err);
      res.status(500).send({ message: "unknown error" });
    });
});

router.post("/putResident", (req: Request, res: Response) => {
  console.log("Updating Resident");
  Resident.updateOne(
    { studentId: req.body.studentId },
    { $set: { checkedIn: false } }
  )
    .then((resi: any) => {
      res.send(resi);
    })
    .catch((err: any) => {
      console.log("error putting resident: ", err);
      res.status(500).send({ message: "unkown error" });
    });
});

module.exports = router;
