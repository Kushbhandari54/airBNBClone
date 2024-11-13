// @ts-nocheck
const express = require("express");
const Places = require("../models/Places");
const router = express.Router({ mergeParams: true });
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const jwtSecret = process.env.JWT_SECRET || "asdlfj23a@12312asdf42lio&uen~cc23";

router.get(
  "/places/:id",
  asyncErrorHandler((req, res) => {
    if (req?.headers?.token) {
      const token = req.headers.token;
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = req.params;
        const response = await Places.findById({ _id: id });
        console.log("RESPONSE", response);
        res.status(200).json({
          message: "Successfull",
          statusCode: 200,
          data: response,
        });
      });
    } else {
      res.status(400).json({
        message: "Token required",
      });
    }
  })
);

router.get(
  "/places",
  asyncErrorHandler(async (req, res) => {
    const token = req.headers.token;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      res.json({
        message: "Successfull ",
        statusCode: "200",
        data: await Places.find({ owner: id }),
      });
    });
  })
);

router.post(
  "/places",
  asyncErrorHandler(async (req, res) => {
    const token = req.headers.token;
    const {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      const placeDoc = await Places.create({
        owner: userData.id,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      res.status(201).json({
        statusCode: "201",
        message: "Data Successfully Inserted",
        data: placeDoc,
      });
    });
  })
);

module.exports = router;
