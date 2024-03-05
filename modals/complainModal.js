const mongoose = require("mongoose");
const validator = require("validator");

const complainSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please specify your name"],
    trim: true,
    validate: {
      validator: function (str) {
        const stringWithoutSpaces = str.replace(/\s/g, "");
        return validator.isAlpha(stringWithoutSpaces);
      },
      message: "Invalid fullname",
    },
  },
  crimeLocation: {
    type: String,
    required: [true, "Please specify the crime location"],
    trim: true,
  },
  contactNumber: {
    type: Number,
    required: [true, "Please specify your contact number"],
    validate: [
      {
        validator: function (num) {
          return num.toString().length === 10;
        },
        message: "Invalid phone number",
      },
      {
        validator: function (num) {
          const regex = /(?:\(?\+977\)?)?[9][6-9]\d{8}/;
          return regex.test(num);
        },
        message: "Invalid phone number",
      },
    ],
  },
  crimeDate: {
    type: Date,
    required: [true, "Please specify the date of crime"],
    validate: {
      validator: function (date) {
        return Date.now() > date;
      },
      message: "Provide valid date",
    },
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
    enum: ["Pending", "In progress", "Solved"],
    default: "Pending",
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
