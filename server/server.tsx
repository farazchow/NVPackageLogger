import { Request, Response } from "express";

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export {};
