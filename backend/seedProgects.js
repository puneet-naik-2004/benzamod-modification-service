require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("./models/Project");

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB Connected for Seeding");

    // Clear old data
    await Project.deleteMany();

    // Insert demo projects
    await Project.insertMany([
      {
        title: "BMW M4 – Full Matte Wrap & Custom Exhaust",
        description: "Complete matte black wrap with performance exhaust upgrade.",
        brand: "BMW",
        type: "Car",
        service: "Wrapping + Exhaust",
        thumbnail: "/images/bmw-thumb.jpg",
        beforeImage: "/images/bmw-before.jpg",
        afterImage: "/images/bmw-after.jpg",
        duration: "2 weeks",
        cost: "$2500",
        review: {
          text: "Amazing work! The car feels brand new and looks stunning.",
          client: "Arjun S.",
        },
      },
      {
        title: "Ducati Panigale – Carbon Fiber Kit",
        description: "Installed full carbon fiber body kit with custom paint highlights.",
        brand: "Ducati",
        type: "Bike",
        service: "Carbon Fiber Kit",
        thumbnail: "/images/ducati-thumb.jpg",
        beforeImage: "/images/ducati-before.jpg",
        afterImage: "/images/ducati-after.jpg",
        duration: "1 week",
        cost: "$1800",
        review: {
          text: "Attention to detail is unmatched. Best bike mod shop!",
          client: "Rahul K.",
        },
      },
    ]);

    console.log("✅ Demo Projects Seeded Successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ Seeding Failed:", err));
