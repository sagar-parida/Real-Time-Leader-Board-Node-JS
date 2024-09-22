const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tournament name is required"],
      unique: [true, "Tournament name is already taken"],
      minLength: [2, "Tournament name must have at least 2 characters"],
      maxLength: [32, "Tournament name must not exceed 32 characters"],
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: [true, "Game ID is required"],
    },
    prize: {
      type: Array,
      default: [],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
    },
    status: {
      type: String,
      default: "not-active",
    },
  },
  { timestamps: true }
);

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
