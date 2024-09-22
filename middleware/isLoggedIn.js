const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../utils/catchAsyncError");

const isLoggedIn = catchAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new errorHandler("Authentication required to access this endpoint", 401)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.decodedToken = decoded;
  return next();
});

module.exports = isLoggedIn;
