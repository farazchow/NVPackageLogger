import { NextFunction, Request, Response } from "express";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
import DeskItem, { DeskItemInterface } from "../models/deskItem";

router.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

// This defines the home page the this route; route would not work without it
router.get("/", (req: Request, res: Response) => {
  console.log("reached home page");
  res.send("Congrats, you've reached the home page of the auth route");
});

router.get("/getAllItems", (req: Request, res: Response) => {
  DeskItem.find(
    {},
    { _id: 1, itemCategory: 1, itemName: 1, currentStatus: 1, lastBorrowed: 1 }
  ).then(
    (
      value: (DeskItemInterface & {
        _id: String;
        itemCategory: String;
        itemName: String;
        currentStatus: String;
        lastBorrowed: Date;
      })[]
    ) => {
      res.send(value);
    }
  );
});

router.get("/getAvailableItems", (req: Request, res: Response) => {
  DeskItem.find(
    { currentStatus: "Available" },
    { _id: 1, itemName: 1, itemCategory: 1, currentStatus: 1 }
  ).then(
    (
      value: (DeskItemInterface & {
        _id: String;
        itemName: String;
        itemCategory: String;
        currentStatus: String;
      })[]
    ) => {
      res.send(value);
    }
  );
});

router.get("/getBorrowedItems", (req: Request, res: Response) => {
  DeskItem.find(
    { currentStatus: { $ne: "Available" } },
    { _id: 1, itemName: 1, itemCategory: 1, currentStatus: 1 }
  ).then(
    (
      value: (DeskItemInterface & {
        _id: String;
        itemName: String;
        itemCategory: String;
        currentStatus: String;
      })[]
    ) => {
      res.send(value);
    }
  );
});

router.get("/getCategoryAvailableItems", (req: Request, res: Response) => {
  DeskItem.find(
    { currentStatus: "Available", itemCategory: req.query.itemCategory },
    { _id: 1, itemName: 1, currentStatus: 1 }
  ).then(
    (
      value: (DeskItemInterface & {
        _id: String;
        itemName: String;
        itemCategory: String;
        currentStatus: String;
      })[]
    ) => {
      console.log("getting available items", req.body.itemCategory);
      res.send(value);
    }
  );
});

router.post("/postNewItem", (req: any, res: Response) => {
  console.log("body is", req.body);
  const newItem = new DeskItem({
    itemName: req.body.itemName,
    itemCategory: req.body.itemCategory,
    currentStatus: "Available",
    lastBorrowed: req.body.lastBorrowed,
    log: [],
  });
  newItem
    .save()
    .then((item: DeskItemInterface) => res.send(item))
    .catch((err: any) => {
      console.log("error posting item", err);
      res.status(500).send({ message: "unknown error" });
    });
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
