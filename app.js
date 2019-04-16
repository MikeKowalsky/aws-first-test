require("dotenv").config();

const path = require("path");

const express = require("express");
const pug = require("pug");

const app = express();

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT, () => {
  console.log(`Server on ${process.env.PORT}`);
});
