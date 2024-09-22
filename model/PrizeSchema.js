const mongoose = require("mongoose");

const PrizeSchema = new mongoose.Schema({
  tournamentName: {
    type: String,
    required: [true, "Tournament name is required"],
  },
  prize: {
    type: String,
    required: [true, "Prize description is required"],
  },
});

module.exports = PrizeSchema;
