const express = require("express");

const router = express.Router();

const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password, confirmPassword } = req.body;

  if (confirmPassword !== password) return res.status(401);
  try {
    const user = await User.create({ name, email, password });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});

module.exports = router;
