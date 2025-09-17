require('dotenv').config()
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes= require("./routes/contactRoutes")
// const projectRoutes= require("./routes/projectRoutes")
const orderRoutes= require("./routes/orderRoutes")
const cartRoutes= require("./routes/cartRoutes")
const userRoutes= require("./routes/userRoutes")
const portfolioRoutes= require("./routes/portfolioRoutes")
const reviewRoutes= require("./routes/reviewRoutes")
// const categoryRoutes= require("./routes/categoryRoutes.js")





const app = express();
const PORT = 3001;

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.use("/service", serviceRoutes);
app.use("/inquiry",inquiryRoutes );
app.use("/auth", authRoutes);
app.use("/contact",contactRoutes);
// app.use("/project",projectRoutes);
app.use("/orders",orderRoutes);
app.use("/cart",cartRoutes);
app.use("/user",userRoutes);
app.use("/portfolio",portfolioRoutes);
app.use("/reviews",reviewRoutes);
// app.use("/category",categoryRoutes);







app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
