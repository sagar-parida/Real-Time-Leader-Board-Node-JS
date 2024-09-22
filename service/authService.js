const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../utils/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const User = require("../model/UserModel");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const generateToken = (user, additionalPayload = {}) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    ...additionalPayload,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const register = catchAsyncError(async (req, res, next) => {
  const { email, password, nameTag } = req.body;
  const validEmail = emailRegex.test(email);
  const validPassword = passwordRegex.test(password);

  if (!validEmail) {
    return next(
      new errorHandler("Invalid email format:" + emailRegex.test(email), 403)
    );
  }

  if (!validPassword) {
    return next(
      new errorHandler(
        "Password must be at least 8 characters and contain at least one letter and one number",
        403
      )
    );
  }

  if (!nameTag) {
    return new errorHandler("NameTag is required", 403);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new errorHandler("User with this email already exists", 403));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    nameTag,
  });

  const token = generateToken(newUser);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    token: token,
    userData: {
      nameTag: newUser.nameTag,
      email: newUser.email,
      profileImage: newUser.profileImage,
    },
  });
});

const auth = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const validEmail = emailRegex.test(email);

  if (!validEmail) {
    return next(new errorHandler("Invalid email format", 403));
  }

  if (!password) {
    return next(new errorHandler("Password is missing", 403));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new errorHandler("No user found with this email", 403));
  }

  const isCorrectPassword = bcrypt.compareSync(password, user.password);

  if (!isCorrectPassword) {
    return next(new errorHandler("Incorrect password", 403));
  }

  const token = generateToken(user);

  return res.status(200).json({
    success: true,
    message: "Login successfully",
    token: token,
  });
});

module.exports = { auth, register };
