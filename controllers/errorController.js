const httpStatus = require("http-status-codes");

exports.logErrors = (error,req, res,next) => {
  console.error(error.stack);
  next(error);
};

//404 page not found
exports.pageNotFoundError = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.render("error",{layout: false});
};

//500 internal server error
exports.internalServerError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is taking a nap!`);
};
