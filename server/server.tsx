import { Application, Request, Response } from "express"; // type checking

// Packages
const express = require("express");
require("dotenv/config");

// Route Handlers
const auth = require("./routes/auth");

const PORT = process.env.PORT || 3000;
const app: Application = express();

// Middleware
app.use(express.json()); // parses the incoming message and puts the data in req.body
app.use(express.urlencoded({ extended: true })); // allow encoded posts/puts like forms

// Routes
app.use("/api/auth", auth); // authentication

// TODO: Error Handling: https://expressjs.com/en/guide/error-handling.html

// Input Handling -> attempt to bypass the following: stackoverflow.com/questions/44788982/node-js-ctrl-c-doesnt-stop-server-after-starting-server-with-npm-start
// Crtl + C doesn't kill the script that runs dev for some reason. // Issue + workaround here: Currently still does not work.
process.on("SIGINT", () => process.exit(0));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export {};
