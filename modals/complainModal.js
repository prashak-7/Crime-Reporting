const mongoose = require("mongoose");
const validator = require("validator");

const complainSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please specify your name"],
    minlength: [7, "Please specify your name"],
    trim: true,
    // validate: {
    //   validator: function (str) {
    //     const stringWithoutSpaces = str.replace(/\s/g, "");
    //     return validator.isAlpha(stringWithoutSpaces);
    //   },
    //   message: "Invalid fullname",
    // },
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
  crimeLocation: {
    type: String,
    required: [true, "Please specify the crime location"],
    trim: true,
    minlength: [4, "Provide a valid address"],
    validate: {
      validator: function (address) {
        const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
        return addressRegex.test(address);
      },
      message: "Provide a valid address",
    },
  },

  crimeDate: {
    type: Date,
    required: [true, "Please specify the date of crime"],
    validate: [
      {
        validator: function (date) {
          return Date.now() > date;
        },
        message: "Please provide a valid date",
      },
      {
        validator: function validateDateLessThan50Years(date) {
          const currentDate = new Date();
          const dateRange = new Date();
          dateRange.setFullYear(currentDate.getFullYear() - 30);
          return dateRange <= date;
        },
        message: "Please provide a valid date",
      },
    ],
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
  crimeType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Under investigation", "Resolved", "Closed"],
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
