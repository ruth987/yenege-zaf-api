require("dotenv").config();
require("./config/db").connect();
const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from your Node.js project!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});