const AppError = require("../utils/appError");

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `${value} already exists. `;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  // const message = errors.join(". ");
  const message = errors[0];
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).render("errorPage", {
      title: "Something went wrong",
      msg: err.message,
    });
  }

  return res.status(err.statusCode).render("errorPage", {
    title: "Something went wrong",
    msg: "Please try again later.",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "development") {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    sendErrorProd(error, req, res);
  }
};
