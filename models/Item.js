const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true
  }
});

// Create and export the model
module.exports = mongoose.model("items", ItemSchema);
