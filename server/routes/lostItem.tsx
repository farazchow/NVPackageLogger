import { NextFunction, Request, Response } from "express";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
import { LostItemInterface } from "../models/lostItem";
import { ArchiveLostItemInterface } from "../models/archiveLostItem";
const { LostItems } = require("../models/lostItem");
const { ArchiveLostItem } = require("../models/archiveLostItem");

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("lostItems here");
  next();
});

router.get("/getLostItems", (req: Request, res: Response) => {
  LostItems.find().then((lostItems: LostItemInterface) => {
    res.send(lostItems);
  });
});

router.post("/addLostItem", (req: Request, res: Response) => {
  console.log("Sending note data back to you!");
  const newLostItem = new LostItems({
    description: req.body.description,
    deskworker: req.body.deskworker,
    createdAt: req.body.createdAt,
  });

  newLostItem
    .save()
    .then((notes: LostItemInterface) => res.send(notes))
    .catch((err: any) => {
      console.log("error posting lost items", err);
      res.status(500).send({ message: "unknown error" });
    });
});

router.post("/deleteLostItem", (req: Request, res: Response) => {
  LostItems.deleteOne({ note: req.body.note })
    .then((note: LostItemInterface) => {
      console.log("deleting lost item");
      res.send(note);
    })
    .catch((err: any) => {
      console.log("error deleting lost item", err);
      res.status(500).send({ message: "unknown error" });
    });
});

router.post("/archiveLostItem", (req: any, res: Response) => {
  console.log("archiving lost item");
  const newArchiveLostItem = new ArchiveLostItem({
    description: req.body.description,
    deskworker: req.body.deskworker,
    createdAt: req.body.createdAt,
    loggedAt: req.body.loggedAt,
  });
  newArchiveLostItem
    .save()
    .then((pkg: ArchiveLostItemInterface) => res.send(pkg))
    .catch((err: any) => {
      console.log("error posting lost item", err);
      res.status(500).send({ message: "unknown error" });
    });
});
module.exports = router;
