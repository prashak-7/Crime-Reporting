const User = require("../modals/userModal");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const createAndSentToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  // user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.registerUser = catchAsync(async (req, res) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    gender: req.body.gender,
  });

  createAndSentToken(newUser, 201, res);
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password"));
  }

  const user = await User.findOne({ email, role: "user" }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createAndSentToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user stills exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("The user no longer exist", 401));
  }

  req.user = currentUser;
  next();
});

exports.logout = (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  }),
    res.status(200).json({ status: "success" });
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // Check if user stills exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  createAndSentToken(user, 200, res);
});

exports.loginAdmin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password"));
  }

  const user = await User.findOne({ email, role: "admin" }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createAndSentToken(user, 200, res);
});
