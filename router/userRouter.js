const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", authController.registerUser);
router.get("/confirm/:token", authController.confirmUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logout);

router.patch(
  "/update-password",
  authController.protect,
  authController.restrictTo("user"),
  authController.updatePassword
);

router.patch(
  "/update-me",
  authController.protect,
  authController.restrictTo("user"),
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

router.get(
  "/my-account",
  authController.protect,
  authController.restrictTo("user"),
  userController.getMe
);

router.get(
  "/all-users",
  authController.protect,
  authController.restrictTo("admin"),
  userController.getAllUsers
);

router.get("/api/all-users", userController.getAllUsersApi);

router.post(
  "/delete-me",
  authController.protect,
  authController.restrictTo("user"),
  userController.deleteMe
);

router.post(
  "/delete-user",
  authController.protect,
  authController.restrictTo("admin"),
  userController.deleteUser
);

router.get(
  "/user/:id",
  authController.protect,
  authController.restrictTo("admin"),
  userController.getUser
);

module.exports = router;
