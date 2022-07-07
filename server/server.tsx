// Typechecking
import { Application, Request, Response } from "express";

// Packages
const mongoose = require("mongoose");
const express = require("express");

// Mongoose Models //
import { User } from "./models/user";
import { Package } from "./models/package";

// ENV Variables //
require("dotenv/config");

// Route Handlers
const auth = require("./routes/auth");
const pckge = require("./routes/package");

const PORT = process.env.PORT || 3000;
const app: Application = express();

// Connect to MongoDB //
mongoose
  .connect(process.env.MONGO_DB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DB_NAME!,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: Error) => console.log(`Error connecting to MongoDB: ${err}`));

// dummy function to post simple data to MongoDB
(async function run() {
  console.log("connected to database");

  // const user: typeof User = mongoose.createUser({ name: "Paul" });
  const user = new User({ name: "Paul", createdAt: Date.now() });
  // const user = User.create({ name: "Paul" });
  await user
    .save()
    .then(() => console.log("User saved"))
    .catch((e: Error) => console.log("error occurred", e));
  // console.log("finished sending user");
  // const object = { testing: "apple", other: "remaining" };

  const pckage = new Package({ name: "package1", createdAt: Date.now(), recipient: "cathy" });
  await pckage
    .save()
    .then(() => console.log("User saved"))
    .catch((e: Error) => console.log("error occurred", e));
})();

// Middleware //
app.use(express.json()); // parses the incoming message and puts the data in req.body
app.use(express.urlencoded({ extended: true })); // allow encoded posts/puts like forms

// Routes
app.use("/api/auth", auth); // authentication
app.use("/api/package", pckge); // authentication

// TODO: Error Handling: https://expressjs.com/en/guide/error-handling.html

// Input Handling -> attempt to bypass the following: stackoverflow.com/questions/44788982/node-js-ctrl-c-doesnt-stop-server-after-starting-server-with-npm-start
// Crtl + C doesn't kill the script that runs dev for some reason. // Issue + workaround here: Currently still does not work.
process.on("SIGINT", () => process.exit(0));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export {};
