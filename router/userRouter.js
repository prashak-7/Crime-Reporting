const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logout);

router.patch(
  "/update-password",
  authController.protect,
  authController.updatePassword
);

router.patch(
  "/update-me",
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

router.get(
  "/me",
  authController.protect,
  authController.restrictTo("user"),
  userController.getMe
);

module.exports = router;
