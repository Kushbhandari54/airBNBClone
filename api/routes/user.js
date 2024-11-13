const express = require("express");
const User = require("../models/User");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || "asdlfj23a@12312asdf42lio&uen~cc23";
require("dotenv").config();

router.post(
  "/register",
  asyncErrorHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    const userDocs = await User.create({
      fullName,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.status(200).json({
      message: "User registration successfull!",
      data: userDocs,
      statusCode: "201",
    });
  })
);
router.post(
  "/login",
  asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body;

    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const isPasswordValid = await bcrypt.compareSync(
        password,
        userDoc.password
      );
      if (isPasswordValid) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (error, token) => {
            if (error) {
              throw error;
            }
            res.status(201).json({
              message: "User registration successfull!",
              token,
              statusCode: "201",
            });
          }
        );
      } else {
        res.status(404).json({
          message: "No user with this email and password!",
        });
      }
    } else {
      res.status(404).json({
        message: "No user with this email and password!",
      });
    }
  })
);

module.exports = router;
