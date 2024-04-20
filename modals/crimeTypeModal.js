const mongoose = require("mongoose");

const crimeTypeSchema = new mongoose.Schema({
  crimeTypes: {
    type: [String],
  },
});

const CrimeType = new mongoose.model("CrimeType", crimeTypeSchema);

module.exports = CrimeType;
