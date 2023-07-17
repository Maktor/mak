import express from "express";
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log(`Port: ${port}`);
});

