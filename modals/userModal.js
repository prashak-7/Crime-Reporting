const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const AppError = require("../utils/appError");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    validate: [validator.isAlpha, "Invalid first name"],
    trim: true,
    minlength: [3, "Provide your real name"],
    maxlength: [15, "Provide your real name"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    validate: [validator.isAlpha, "Invalid last name"],
    minlength: [3, "Provide your real name"],
    maxlength: [15, "Provide your real name"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    validate: {
      validator: function (val) {
        return !isNaN(val) && typeof val === "number" && val >= 5;
      },
      message: "Invalid age",
    },
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [9, "Provide a valid address"],
    validate: {
      validator: function (address) {
        const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
        return addressRegex.test(address);
      },
      message: "Provide a valid address",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  gender: {
    type: String,
    required: [true, "Please specify your gender"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be 8 characters long"],
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: [
      {
        validator: function (val) {
          if (this.password.length >= 8 && val === "") return false;
        },
        message: "Please confirm your password",
      },
      {
        validator: function (val) {
          if (this.password.length >= 8) return this.password === val;
        },
        message: "Passwords are not the same",
      },
    ],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function (next) {
  // Capitalize the 'name' field
  if (this.firstName) {
    this.firstName =
      this.firstName.charAt(0).toUpperCase() +
      this.firstName.slice(1).toLowerCase();
  }
  if (this.lastName) {
    this.lastName =
      this.lastName.charAt(0).toUpperCase() +
      this.lastName.slice(1).toLowerCase();
  }
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Virtual populate
userSchema.virtual("complain", {
  ref: "Complain",
  foreignField: "complainer",
  localField: "_id",
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
