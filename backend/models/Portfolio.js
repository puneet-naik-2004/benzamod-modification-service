const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Portfolio Title
    description: { type: String, required: true }, // Short Description
    beforePhoto: { type: String, required: true }, // Before work image (URL / Path)
    afterPhoto: { type: String, required: true }, // After work image (URL / Path)
    price: { type: String, required: true }, // After work image (URL / Path)
    reviews: [
      {
        // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Linked to user who reviewed
        name: { type: String, required: true },
        comment: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5, required: true }, // ⭐ 1–5 rating
        createdAt: { type: Date, default: Date.now },
      },
    ],

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
