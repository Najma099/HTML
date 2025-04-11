const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

mongoose.connect("xxx");

app.use(express.json());
app.post("/signin", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  const existing = await User.findOne({ name, email });
  if (existing) return res.status(401).send("Username already exist");
  const newuser = new User({
    name,
    email,
    password,
  });
  await newuser.save();
  res.status(200).send("User register SuccessFull");
});

app.listen(3000);
