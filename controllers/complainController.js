const catchAsync = require("../utils/catchAsync");
const Complain = require("../modals/complainModal");

exports.getAllComplains = catchAsync(async (req, res, next) => {
  const complains = await Complain.find().populate({
    path: "complainer",
    select: "-__v -role",
  });
  res.status(200).json({
    status: "success",
    data: {
      complains,
    },
  });
});

exports.createComplain = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;

  const newComplain = await Complain.create({
    fullName: req.body.fullName,
    crimeLocation: req.body.crimeLocation,
    contactNumber: req.body.contactNumber,
    crimeDate: req.body.crimeDate,
    crimeDescription: req.body.crimeDescription,
    complainer: req.user.id,
    province: req.body.province,
    policeStation: req.body.province,
  });

  res.status(200).json({
    status: "success",
    data: {
      complain: newComplain,
    },
  });
});

exports.getComplain = catchAsync(async (req, res, next) => {
  const complains = await Complain.find({ complainer: req.user.id });
  // res.status(200).json({
  //   status: "success",
  //   complain,
  // });
  res.status(200).render("userComplaints", {
    complains,
    title: "My Complaints",
  });
});
