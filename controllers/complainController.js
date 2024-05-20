const catchAsync = require("../utils/catchAsync");
const Complain = require("../modals/complainModal");
const PoliceStation = require("../modals/stationModal");

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
    crimeType: req.body.crimeType,
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

exports.getAllComplaintsApi = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const query = Complain.find(queryObj).populate({
    path: "complainer",
    select: "-__v -role",
  });

  if (queryObj.all === "") {
    const complaints = await Complain.find().populate({
      path: "complainer",
      select: "-__v -role",
    });
    return res.status(200).json({
      status: "success",
      data: {
        complaints,
      },
    });
  }

  if (queryObj.crimeDate) {
    const date = queryObj.crimeDate;
    if (date === "Today") {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const startOfDay = today.toISOString();
      const endOfDay = new Date(
        today.getTime() + 24 * 60 * 60 * 1000
      ).toISOString();

      const complaints = await Complain.find({
        crimeDate: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      });

      return res.status(200).json({
        status: "success",
        data: {
          complaints,
        },
      });
    }
    if (date === "One week ago") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setUTCDate(oneWeekAgo.getUTCDate() - 7);

      const complaints = await Complain.find({
        crimeDate: {
          $gte: oneWeekAgo.toISOString(),
          $lte: new Date().toISOString(),
        },
      });
      return res.status(200).json({
        status: "success",
        data: {
          complaints,
        },
      });
    }

    if (date === "One month ago") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setUTCMonth(oneMonthAgo.getUTCMonth() - 1);

      const complaints = await Complain.find({
        crimeDate: {
          $gte: oneMonthAgo.toISOString(),
          $lt: new Date().toISOString(),
        },
      });
      return res.status(200).json({
        status: "success",
        data: {
          complaints,
        },
      });
    }

    if (date === "One year ago") {
      const oneYearAgo = new Date();
      oneYearAgo.setUTCFullYear(oneYearAgo.getUTCFullYear() - 1);

      const complaints = await Complain.find({
        crimeDate: {
          $gte: oneYearAgo.toISOString(),
          $lte: new Date().toISOString(),
        },
      });
      return res.status(200).json({
        status: "success",
        data: {
          complaints,
        },
      });
    }
  }

  if (queryObj.crimeType === "Others") {
    const complaints = await Complain.find({ crimeType: "Not listed" });
    return res.status(200).json({
      status: "success",
      data: {
        complaints,
      },
    });
  }

  if (queryObj.policeStation) {
    const complaints = await Complain.find({
      policeStation: queryObj.policeStation,
    });
    return res.status(200).json({
      status: "success",
      data: {
        complaints,
      },
    });
  }

  const complaints = await query;
  res.status(200).json({
    status: "success",
    data: {
      complaints,
    },
  });
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
