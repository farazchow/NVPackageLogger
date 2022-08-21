import { Application, NextFunction, Request, Response } from "express";
import { FilterQuery, Model, ProjectionType, QueryOptions } from "mongoose";

// Packages
const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const session = require("express-session");

// ENV Variables //
require("dotenv/config");

// Route Handlers
const auth = require("./routes/auth");
const pckge = require("./routes/package");
const deskItem = require("./routes/deskItem");
const notes = require("./routes/notes");
const rsdnt = require("./routes/resident");
const lostItem = require("./routes/lostItem");

const PORT = process.env.PORT || 3000;
const app: Application = express();
const ONEHOUR = 1000 * 60 * 60;

// Connect to MongoDB //
mongoose
  .connect(process.env.MONGO_DB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DB_NAME,
  })
  .then(() => console.log(`Connected to MongoDB`))
  .catch((err: Error) => console.log(`Error connecting to MongoDB ${err}`));

// Generic Helper Functions //
export function findAny<T>(
  req: Request,
  res: Response,
  model: Model<T>,
  params: {
    filter: FilterQuery<T> | any;
    projection?: ProjectionType<T> | any;
    options?: QueryOptions<T> | any;
    callback?: any;
  },
  errmsg: string = "Unknown Error"
): any {
  return model.find({ ...params }).then((result: any) => result);
}

export function saveAny<T, override = T>(
  req: Request,
  res: Response,
  model: Model<T>,
  params: T & override,
  errmsg: string = "Unknown Error"
): any {
  return new model(params).save();
}

// Middleware //
app.use(express.json()); // parses the incoming message and puts the data in req.body
app.use(express.urlencoded({ extended: true })); // allow encoded posts/puts like forms

if (process.env.NODE_ENV === "production") {
  app.set("trust-proxy", 1);
}

app.use(
  session({
    proxy: process.env.NODE_ENV === "production", // for session to use app's proxy
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: ONEHOUR, // one hour - TODO: is this what we want?
    },
  })
);

// Passport.js
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport"); // use the passport config file

// Routes
app.use("/api/auth", auth); // authentication
app.use("/api/package", pckge);
app.use("/api/deskItem", deskItem);
app.use("/api/notes", notes); // authentication
app.use("/api/resident", rsdnt);
app.use("/api/lostItems", lostItem);

// Error Handling
app.use(
  (
    err: Error & { status: number | undefined },
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const status = err.status || 500;
    if (status === 500) {
      // 500 means Internal Server Error
      console.log("The server errored when processing a request!");
      console.log(err);
    }

    res.status(status);
    res.send({
      status: status,
      message: err.message,
    });
  }
);

// Input Handling -> attempt to bypass the following: stackoverflow.com/questions/44788982/node-js-ctrl-c-doesnt-stop-server-after-starting-server-with-npm-start
// Crtl + C doesn't kill the script that runs dev for some reason. // Issue + workaround here: Currently still does not work.
if (process.stdin.isTTY) {
  process.stdin.setRawMode(false);
}

process.on("SIGINT", () => {
  console.log("received signal");
  process.exit(0);
});

process.on("SIGBREAK", () => {
  console.log("received break signal");
  process.exit(0);
});

// Static files for images
app.use(express.static(__dirname + "/client/images"));
app.use(express.static("build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
