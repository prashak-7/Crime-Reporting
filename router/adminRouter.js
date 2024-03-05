const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/admin-login", authController.loginAdmin);
router.get("/admin-logout", authController.logout);

module.exports = router;
