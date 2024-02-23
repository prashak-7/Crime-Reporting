const express = require("express");
const complainController = require("../controllers/complainController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/my-complaints",
  authController.protect,
  authController.restrictTo("user"),
  complainController.getComplain
);

router.get(
  "/complains",
  authController.protect,
  authController.restrictTo("admin"),
  complainController.getAllComplains
);

router.post(
  "/register-complain",
  authController.protect,
  complainController.createComplain
);

module.exports = router;
