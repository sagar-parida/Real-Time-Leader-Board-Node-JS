const mongoose = require("mongoose");
const PrizeSchema = require("./PrizeSchema");

const userSchema = new mongoose.Schema(
  {
    nameTag: {
      type: String,
      requried: [true, "UserTag is required"],
      unique: [true, "UserTag is already taken"],
      minLength: [3, "userTag must have atleast 3 characters"],
      maxLength: [32, "UserTag must not exceeed 32 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already used."],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password invalid",
      ],
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    prizes: [PrizeSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
