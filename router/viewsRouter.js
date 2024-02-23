const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", viewsController.getOverview);
router.get("/register", viewsController.getRegisterForm);
router.get("/login", viewsController.getLoginForm);
router.get("/admin", viewsController.getAdminLoginForm);

router.use(authController.isLoggedIn);

router.get(
  "/user-overview",
  authController.protect,
  authController.restrictTo("user"),
  viewsController.getUserDashboard
);

router.get(
  "/register-complain",
  authController.protect,
  authController.restrictTo("user"),
  viewsController.getComplainForm
);

// reverse changes after here
router.get(
  "/admin-overview",
  authController.protect,
  authController.restrictTo("admin"),
  viewsController.getAdminDashboard
);

module.exports = router;
