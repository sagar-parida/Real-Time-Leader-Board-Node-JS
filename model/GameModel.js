const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Game must have a name"],
      minLength: [3, "Game name must have at least 3 characters"],
      maxLength: [45, "Game name must not exceed 64 characters"],
    },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
