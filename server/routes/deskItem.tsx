import { NextFunction, Request, Response } from "express";
// import { FilterQuery, Model, ProjectionType, QueryOptions } from "mongoose";
const express = require("express");
const router = express.Router();
require("mongoose");
import DeskItem, { DeskItemInterface } from "../models/deskItem";
import { findAny, saveAny } from "../server";

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("deskItems here");
  next();
});

router.get("/getAllItems", (req: Request, res: Response) => {
  findAny<DeskItemInterface>(req, res, DeskItem, {
    filter: {},
    projection: {
      log: 0,
    },
  })
    .then((deskItems: DeskItemInterface[]) => res.send(deskItems))
    .catch((e: Error) => res.status(500).send({ message: "Error", e }));
});

router.get("/getAvailableItems", (req: Request, res: Response): void => {
  findAny<DeskItemInterface>(req, res, DeskItem, {
    filter: { currentStatus: "Available" },
    projection: {
      log: 0,
      lastBorrowed: 0,
    },
  })
    .then((availItems: DeskItemInterface[]) => res.send(availItems))
    .catch((e: Error) => res.status(500).send({ message: "Error", e }));
});

router.get("/getBorrowedItems", (req: Request, res: Response) => {
  findAny<DeskItemInterface>(req, res, DeskItem, {
    filter: { currentStatus: { $ne: "Available" } },
    projection: {
      log: 0,
      lastBorrowed: 0,
    },
  })
    .then((borrowedItems: DeskItemInterface[]) => res.send(borrowedItems))
    .catch((e: Error) => res.status(500).send({ message: "Error", e }));
});

router.get("/getCategoryAvailableItems", (req: Request, res: Response) => {
  findAny<DeskItemInterface>(req, res, DeskItem, {
    filter: {
      currentStatus: "Available",
      itemCategory: req.query.itemCategory,
    },
    projection: { _id: 1, itemName: 1, currentStatus: 1 },
  })
    .then((cateItems: DeskItemInterface[]) => res.send(cateItems))
    .catch((e: Error) => res.status(500).send({ message: "Error", e }));
});

router.post("/postNewItem", (req: any, res: Response) => {
  saveAny<DeskItemInterface, any>(
    req,
    res,
    DeskItem,
    {
      itemName: req.body.itemName,
      itemCategory: req.body.itemCategory,
      currentStatus: "Available",
      lastBorrowed: req.body.lastBorrowed,
    },
    "Error posting new item"
  );
});

router.post("/lendItem", (req: any, res: Response) => {
  DeskItem.findById(req.body.itemId)
    .then((item: DeskItemInterface | undefined | null) => {
      if (!item || item === null) {
        console.log("couldn't find item by id");
      } else {
        item.currentStatus = req.body.resident;
        item.lastBorrowed = req.body.lastBorrowed;
        item.save().then((lentItem: DeskItemInterface) => {
          console.log("item lended", lentItem);
          res.send(lentItem);
        });
      }
    })
    .catch((err: any) => {
      console.log("error lending item", err);
      res.status(500).send({ message: "unknown error" });
    });
});

router.post("/returnItem", (req: any, res: Response) => {
  DeskItem.findById(req.body._id)
    .then((item: DeskItemInterface | undefined | null) => {
      if (!item || item === null) {
        console.log("couldn't find item by id");
      } else {
        item.currentStatus = "Available";
        item.log.push({
          residentId: req.body.residentId,
          borrowedAt: req.body.borrowedAt,
          returnedAt: req.body.returnedAt,
          notes: req.body.notes,
        });
        item.save().then((lentItem: DeskItemInterface) => {
          console.log("item lended", lentItem);
          res.send(lentItem);
        });
      }
    })
    .catch((err: any) => {
      console.log("error editing sticker position ", err);
      res.status(500).send({ message: "unknown error" });
    });
});

router.post("/delete/desk-item", (req: any, res: Response) => {
  console.log("id is", req.body._id);
  DeskItem.deleteOne({ _id: req.body._id })
    .then((item) => {
      console.log("item found is", item);
      res.send(item);
    })
    .catch((err: Error) => {
      res.status(500).send({ message: "Unknown Error!" });
    });
});

module.exports = router;
