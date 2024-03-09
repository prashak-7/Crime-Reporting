const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const viewsRouter = require("./router/viewsRouter");
const userRouter = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");
const complainRouter = require("./router/complainRouter");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", viewsRouter);
app.use("/", userRouter);
app.use("/api", userRouter);
app.use("/", complainRouter);
app.use("/api", complainRouter);
app.use("/", adminRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});
app.use(globalErrorHandler);

module.exports = app;
