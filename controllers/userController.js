const multer = require("multer");
const sharp = require("sharp");
const User = require("../modals/userModal");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Email = require("../utils/email");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req, file, cb) => {
//     const extension = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
//   },
// });
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError("Select a photo"));

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     user,
  //   },
  // });
  res.status(200).render("profile", {
    user,
    title: "My Account",
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).render("admin/user", { user });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: "user" });
  res.status(200).render("admin/allUsers", { users });
});

exports.getAllUsersApi = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  if (queryObj.all === "") {
    const users = await User.find({ role: "user" });
    return res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  }

  if (queryObj.gender) {
    const gender = queryObj.gender;
    if (gender === "male") {
      const users = await User.find({ gender: "male" });
      return res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    }

    if (gender === "female") {
      const users = await User.find({ gender: "female" });
      return res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    }

    if (gender === "others") {
      const users = await User.find({ gender: "others" });
      return res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    }
  }

  if (queryObj.registeredDate) {
    const date = queryObj.registeredDate;
    if (date === "Today") {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const startOfDay = today.toISOString();
      const endOfDay = new Date(
        today.getTime() + 24 * 60 * 60 * 1000
      ).toISOString();

      const users = await User.find({
        registeredDate: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      });

      return res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    }
    if (date === "Last week") {
      const weekAgo = new Date();
      weekAgo.setUTCDate(weekAgo.getUTCDate() - 7);

      const users = await User.find({
        registeredDate: {
          $gte: weekAgo.toISOString(),
          $lte: new Date().toISOString(),
        },
      });
      return res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    }

    if (date === "Last month") {
      const monthAgo = new Date();
      monthAgo.setUTCMonth(monthAgo.getUTCMonth() - 1);

      const users = await User.find({
        registeredDate: {
          $gte: monthAgo.toISOString(),
          $lt: new Date().toISOString(),
        },
      });
      return res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    }
  }
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "");
  if (req.file) filteredBody.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("Your password doesn't match.", 401));
  }
  await User.findByIdAndDelete(req.user.id);
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  }),
    res.status(200).json({
      status: "success",
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.body.userId;
  const user = await User.findByIdAndDelete(id);
  try {
    await new Email(user).deleteUser();
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log("ERROR SENDING DELETE USER MAIL", err);
  }
});
