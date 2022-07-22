import { NextFunction, Request, Response } from "express";
import { PackageInterface } from "../models/package";
import { ArchivePackageInterface } from "../models/archivePackage";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Package } = require("../models/package");
const { ArchivePackage } = require("../models/archivePackage");

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

router.get("/getPackages", (req: Request, res: Response) => {
  console.log("Sending package data back to you!");
  Package.find().then((pkg: PackageInterface) => {
    res.send(pkg);
  });
});

// TODO: add type for req after editing package recipient as recipient object not string
router.post("/postPackage", (req: any, res: Response) => {
  console.log("posting packages");
  const newPackage = new Package({
    shipping_id: req.body.shipping_id,
    shipper: req.body.shipper,
    location: req.body.location,
    notes: req.body.notes,
    recipient: req.body.recipient,
    workerIn: req.body.worker,
    createdAt: req.body.createdAt,
  });
  newPackage
    .save()
    .then((pkg: PackageInterface) => res.send(pkg))
    .catch((err: any) => {
      console.log("error posting package", err);
      res.status(500).send({ message: "unknown error" });
    });
});

router.post("/deletePackage", (req: Request, res: Response) => {
  Package.deleteOne({ shipping_id: req.body.shipping_id })
    .then((pkg: PackageInterface) => {
      console.log("deleting package");
      res.send(pkg);
    })
    .catch((err: any) => {
      console.log("error deleting package ", err);
      res.status(500).send({ message: "unknown error" });
    });
});

router.post("/archivePackage", (req: any, res: Response) => {
  console.log("archiving packages");
  const newArchivePackage = new ArchivePackage({
    shipping_id: req.body.shipping_id,
    shipper: req.body.shipper,
    location: req.body.location,
    notes: req.body.notes,
    recipient: req.body.recipient,
    workerIn: req.body.workerIn,
    workerOut: req.body.workerOut,
    createdAt: req.body.createdAt,
    deliveredAt: req.body.deliveredAt,
  });
  newArchivePackage
    .save()
    .then((pkg: ArchivePackageInterface) => res.send(pkg))
    .catch((err: any) => {
      console.log("error posting package", err);
      res.status(500).send({ message: "unknown error" });
    });
});

module.exports = router;
