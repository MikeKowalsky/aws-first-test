require("dotenv").config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");

const users = require("./routes/user");
const User = require("./models/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/users", users);

// Goes through all models and relations and sync them with db
// if there is no table for particular model, then it will be created
sequelize
  .sync()
  // .sync({ force: true })
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      console.log("Creating duum user.");
      return User.create({
        name: "Mike",
        email: "test@test.com",
        password: "666"
      });
    }
    return user;
  })
  .then(cart => {
    // console.log(user);
    console.log("**** **** **** ****");
    console.log("**** MySQL Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server on ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
