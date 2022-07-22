import { NextFunction, Request, Response } from "express";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
import { NotesInterface } from "../models/notes";
const { Notes } = require("../models/notes");

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("dailynotes here");
  next();
});

router.get("/", (req: Request, res: Response) => {
    console.log("reached home page");
    res.send("Congrats, you've reached the home page of the dailynotes route");
  });

router.get("/getNotes", (req: Request, res: Response) => {
  Notes.find().then((notes: NotesInterface) => {
    res.send(notes);
  });
});


router.post("/addNote", (req: Request, res: Response) => {
    console.log("Sending note data back to you!");
    const newNote = new Notes({
      note: req.body.note,
      deskworker: req.body.deskworker,
      createdAt: req.body.createdAt,
      });
    
      newNote
        .save()
        .then((notes: NotesInterface) => res.send(notes))
        .catch((err: any) => {
          console.log("error posting notes", err);
          res.status(500).send({ message: "unknown error" });
        });
  });

  module.exports = router;