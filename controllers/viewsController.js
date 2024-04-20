const PoliceStation = require("../modals/stationModal");
const CrimeType = require("../modals/crimeTypeModal");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  res
    .status(200)
    // .json({
    //   status: "success",
    //   message: "Home page displayed",
    // });
    .render("home", {
      title: "Online Crime Reporting System",
    });
});

exports.getRegisterForm = catchAsync(async (req, res, next) => {
  res
    .status(200)
    // .json({
    //   status: "success",
    //   message: "Registration form displayed",
    // });
    .render("register", {
      title: "Register",
    });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res
    .status(200)
    // .json({
    //   status: "success",
    //   message: "Login form displayed",
    // });
    .render("login", {
      title: "Login",
    });
});

exports.getUserDashboard = catchAsync(async (req, res, next) => {
  res
    .status(200)
    // .json({
    //   status: "success",
    //   message: "userDashboard displayed",
    // });
    .render("userDashboard", {
      title: "Dashboard",
    });
});

exports.getComplainForm = catchAsync(async (req, res, next) => {
  const stations = await PoliceStation.findOne();
  const crimes = await CrimeType.findOne();
  res
    .status(200)
    // .json({
    //   status: "success",
    //   message: "complainForm displayed",
    // });
    .render("complainForm", {
      title: "Register Complain",
      stations,
      crimes,
    });
});

exports.getAdminLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render("admin/adminForm", {
    title: "Admin Login",
  });
});

exports.getAdminDashboard = catchAsync(async (req, res, next) => {
  res
    .status(200)
    // .json({
    //   status: "success",
    //   message: "adminDashboard displayed",
    // });
    .render("admin/adminDashboard");
});
