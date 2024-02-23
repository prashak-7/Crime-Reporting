const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please specify your name"],
    trim: true,
  },
  crimeLocation: {
    type: String,
    required: [true, "Please specify the crime location"],
    trim: true,
  },
  contactNumber: {
    type: Number,
    required: [true, "Please specify your contact number"],
  },
  crimeDate: {
    type: Date,
    required: [true, "Please specify the date of crime"],
  },
  province: {
    type: String,
    required: true,
  },
  policeStation: {
    type: String,
    required: true,
  },
  crimeDescription: {
    type: String,
    required: [true, "Please provide the details about the crime"],
    trim: true,
  },
  complainedDate: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["pending", "progress"],
    default: "pending",
  },
  complainer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

complainSchema.pre(/^find/, function (next) {
  this.populate("complainer");
  next();
});

const Complain = mongoose.model("Complain", complainSchema);

module.exports = Complain;
