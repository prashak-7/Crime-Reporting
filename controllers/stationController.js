const catchAsync = require("../utils/catchAsync");
const PoliceStation = require("../modals/stationModal");

exports.getStations = catchAsync(async (req, res, next) => {
  const stations = await PoliceStation.findOne();
  res.status(200).json({
    status: "success",
    data: {
      stations,
    },
  });
});
