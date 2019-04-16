require("dotenv").config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-idsge.mongodb.net/aws-test?retryWrites=true`;

const User = require("./models/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password, confirmPassword } = req.body;

  const newUser = new User({ name, email, password });
  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
  } catch (err) {
    console.log(err);
  }

  res.redirect("/");
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("***** MongoDB connected *****");
    app.listen(process.env.PORT, () => {
      console.log(`Server on ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
