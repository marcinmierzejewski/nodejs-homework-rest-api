const express = require("express");
const router = express.Router();
const User = require("../../service/schemas/userSchemas");
const jwt = require("jsonwebtoken");
// const passport = require("passport");
require("dotenv").config();
const secret = process.env.SECRET;

const { validateSignUp } = require("../../tools/userValidator");

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const { error } = validateSignUp({ email, password });
  if (error) {
    console.log(error);
    return res.json({ status: 400, msg: "Missing fields" });
  }

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    res.json({
      status: 201,
      msg: "Create new user",
      data: { email: newUser.email, subscription: "starter" },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Email or password is wrong",
      data: "Bad request",
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
    subscription: user.subscription,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user.id, { token });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    message: `Login successful. ${user.email}`,
  });
});

module.exports = router;
