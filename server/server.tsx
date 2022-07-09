import { Application, NextFunction, Request, Response } from "express";
// Packages
const mongoose = require("mongoose");
const express = require("express");

// Mongoose Models //
import { User } from "./models/user";

// ENV Variables //
require("dotenv/config");

// Route Handlers
const auth = require("./routes/auth");

const PORT = process.env.PORT || 3000;
const app: Application = express();

// Connect to MongoDB //
mongoose
  .connect(process.env.MONGO_DB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DB_NAME,
  })
  .then(() => console.log(`Connected to MongoDB`))
  .catch((err: Error) => console.log(`Error connecting to MongoDB ${err}`));

// dummy function to post simple data to MongoDB
(async function run() {
  console.log("connected to database");

  // const user: typeof User = mongoose.createUser({ name: "Paul" });
  const user = new User({
    name: "Paul",
    createdAt: Date.now(),
    happinessLevel: "10",
  });
  // const user = User.create({ name: "Paul" });
  await user
    .save()
    .then(() => console.log("User saved"))
    .catch((e: Error) => console.log("error occurred", e));
  // console.log("finished sending user");
  // const object = { testing: "apple", other: "remaining" };
})();

// Middleware //
app.use(express.json()); // parses the incoming message and puts the data in req.body
app.use(express.urlencoded({ extended: true })); // allow encoded posts/puts like forms

// Routes
app.use("/api/auth", auth, () => {
  console.log("authentication");
}); // authentication

// Error Handling
app.use(
  (
    err: Error & { status: number | undefined },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
const a = "2";

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export {};
