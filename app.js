require("dotenv").config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-idsge.mongodb.net/aws-test?retryWrites=true`;

const users = require("./routes/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/users", users);

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
