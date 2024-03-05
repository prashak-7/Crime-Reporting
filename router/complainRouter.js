const express = require("express");
const complainController = require("../controllers/complainController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register-complaint",
  authController.protect,
  complainController.createComplaint
);

router.get(
  "/my-complaints",
  authController.protect,
  authController.restrictTo("user"),
  complainController.userComplaint
);

router.get(
  "/all-complaints",
  authController.protect,
  authController.restrictTo("admin"),
  complainController.getAllComplaints
);

router.get(
  "/all-complaints/:id",
  authController.protect,
  authController.restrictTo("admin"),
  complainController.getComplaint
);

router.patch(
  "/update-complaint/",
  authController.protect,
  authController.restrictTo("admin"),
  complainController.updateComplaint
);

router.delete(
  "/delete-complaint/:id",
  authController.protect,
  authController.restrictTo("admin"),
  complainController.deleteComplaint
);

module.exports = router;
