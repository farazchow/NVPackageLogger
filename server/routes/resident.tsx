import { NextFunction, Request, Response } from "express";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Resident } = require("../models/resident");
import { Semester, semester } from "../models/semester";
import { findAny } from "../server";

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("resident here");
  next();
});

router.get("/getResidents", (req: Request, res: Response) => {
  console.log("Sending resident data back to you!");

  Resident.find({}).then((resident: typeof Resident[]) => {
    console.log("resident found is", resident);
    res.send(resident);
  });
});

router.get("/getNotCheckedInResidents", (req: Request, res: Response) => {
  console.log("Sending resident data back to you!");

  Resident.find({ checkedIn: false }).then((resident: typeof Resident[]) => {
    res.send(resident);
  });
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
  const emptySemester: semester[] = [];

  const newResident = new Resident({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    residentID: req.body.residentID,
    kerb: req.body.kerb,
    year: req.body.year,
    homeAddress: req.body.homeAddress,
    phoneNumber: req.body.phoneNumber,
    forwardingAddress: req.body.forwardingAddress,
    checkedIn: false,
    semesters: emptySemester,
  });

  newResident
    .save()
    .then((resi: any) => res.send(resi))
    .catch((err: any) => {
      console.log("error posting resident", err);
      res.status(500).send({ message: "unknown error" });
    });
});

router.post("/checkoutResident", (req: Request, res: Response) => {
  console.log("Checking Out Resident");
  Resident.updateOne(
    { residentID: req.body.residentID },
    { $set: { checkedIn: false, dateOut: req.body.date } }
  )
    .then((resi: any) => {
      res.send(resi);
    })
    .catch((err: any) => {
      console.log("error putting resident: ", err);
      res.status(500).send({ message: "unkown error" });
    });
});

router.post("/checkinresident", (req: Request, res: Response) => {
  console.log("checkin resident");
  Resident.updateOne(
    { residentID: req.body.residentID },
    {
      $set: {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        residentID: req.body.residentID,
        kerb: req.body.kerb,
        year: req.body.year,
        homeAddress: req.body.homeAddress,
        phoneNumber: req.body.phoneNumber,
        forwardingAddress: req.body.forwardingAddress,
        checkedIn: true,
        semesters: [
          new Semester({
            room: req.body.room,
            dateIn: req.body.dateIn,
            dateOut: req.body.dateOut,
            notes: req.body.notes,
          }),
          ,
        ],
      },
    }
  )
    .then((resi: any) => {
      res.send(resi);
    })
    .catch((err: any) => {
      console.log("error putting resident: ", err);
      res.status(500).send({ message: "unkown error" });
    });
});

router.post("/editResident", (req: Request, res: Response) => {
  console.log("updating resident");
  Resident.updateOne(
    { residentID: req.body.residentID },
    {
      $set: {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        residentID: req.body.residentID,
        kerb: req.body.kerb,
        year: req.body.year,
        homeAddress: req.body.homeAddress,
        phoneNumber: req.body.phoneNumber,
        forwardingAddress: req.body.forwardingAddress,
        checkedIn: req.body.checkedIn,
        semesters: req.body.semesters,
      },
    }
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
