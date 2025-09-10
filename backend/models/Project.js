const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  brand: String,
  type: { type: String, enum: ["Car", "Bike"], required: true },
  service: String,
  thumbnail: String,
  beforeImage: String,
  afterImage: String,
  duration: String,
  cost: String,
  review: {
    text: String,
    client: String,
  },
});

module.exports = mongoose.model("Project", projectSchema);
