const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  policeStations: {
    type: [String],
  },
});

const PoliceStation = new mongoose.model("PoliceStation", stationSchema);

module.exports = PoliceStation;
