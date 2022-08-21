import { NextFunction, Request, Response } from "express";
import { pckge } from "../models/package";
import { ArchivePackageInterface } from "../models/archivePackage";
import { findAny, saveAny } from "../server";
import { Types } from "mongoose";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Package } = require("../models/package");
const { ArchivePackage } = require("../models/archivePackage");

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("packge here");
  next();
});

function deletePackage(id: Types.ObjectId): void {
  Package.deleteOne({ _id: id });
}

function addPackage(req: Request, res: Response, archive: boolean): void {
  const body = {
    _id: new Types.ObjectId(),
    trackingNo: req.body.trackingNo,
    carrier: req.body.carrier,
    recipient: req.body.recipient,
    recipientKerb: req.body.recipientKerb,
    location: req.body.location,
    notes: req.body.notes,
    loggedBy: req.body.loggedBy,
    receivedAt: req.body.receivedAt,
    deliveredAt: req.body.deliveredAt,
    // Q: should we have an archive boolean
  };

  archive
    ? saveAny<ArchivePackageInterface>(req, res, ArchivePackage, body)
    : saveAny<pckge>(req, res, Package, body);
}

router.get("/getPackages", (req: Request, res: Response) => {
  console.log("Sending package data back to you!");
  findAny<pckge>(req, res, Package, { filter: {} })
    .then((packages: pckge[]) => res.send(packages))
    .catch((e: Error) => res.status(500).send({ message: "Error", e }));
});

router.get("/archived/getPackages", (req: Request, res: Response) => {
  console.log("Sending package data back to you!");
  findAny<ArchivePackageInterface>(req, res, ArchivePackage, { filter: {} })
    .then((packages: pckge[]) => res.send(packages))
    .catch((e: Error) => res.status(500).send({ message: "Error", e }));
});

// TODO: add type for req after editing package recipient as recipient object not string
router.post("/postPackage", (req: any, res: Response) => {
  console.log("posting packages");
  addPackage(req, res, false);
});

router.post("/deletePackage", (req: Request, res: Response) => {
  deletePackage(req.body._id);
});

router.post("/archivePackage", (req: any, res: Response) => {
  // delete package from active packages to archived pacakges
  deletePackage(req.body._id);

  addPackage(req, res, true);
});

module.exports = router;
