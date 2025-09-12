const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_STRING}benzamod`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" MongoDB connected",`${process.env.MONGODB_STRING}benzamod`);
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
