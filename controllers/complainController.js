const catchAsync = require("../utils/catchAsync");
const Complain = require("../modals/complainModal");

exports.createComplaint = catchAsync(async (req, res, next) => {
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
    policeStation: req.body.policeStation,
  });

  res.status(200).json({
    status: "success",
    data: {
      complain: newComplain,
    },
  });
});

exports.getAllComplaints = catchAsync(async (req, res, next) => {
  const complaints = await Complain.find().populate({
    path: "complainer",
    select: "-__v -role",
  });
  res
    .status(200)
    // .json({
    //   status: "success",
    //   data: {
    //     complaints,
    //   },
    // });
    .render("admin/allComplaints", { complaints });
});

exports.userComplaint = catchAsync(async (req, res, next) => {
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

exports.getComplaint = catchAsync(async (req, res, next) => {
  const complaint = await Complain.findById(req.params.id);
  res
    .status(200)
    // .json({
    //   status: "success",
    //   data: {
    //     complaint,
    //   },
    // });.
    .render("admin/singleComplaint", { complaint });
});

exports.updateComplaint = catchAsync(async (req, res, next) => {
  const { complaintId, status } = req.body;
  await Complain.findByIdAndUpdate(complaintId, { status });
});

exports.deleteComplaint = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Complain.findByIdAndDelete(id);
});
