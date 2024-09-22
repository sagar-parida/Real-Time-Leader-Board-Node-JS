const jwt = require("jsonwebtoken");
const catchAsyncError = require("../utils/catchAsyncError");
const errorHandler = require("../utils/errorHandler");

const isAdminUser = catchAsyncError(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new errorHandler("Authentication required to access this endpoint"),
      401
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { role } = decoded;

  if (role != "admin") {
    return next(new errorHandler("Insufficient privilages"), 401);
  }

  return next();
});
