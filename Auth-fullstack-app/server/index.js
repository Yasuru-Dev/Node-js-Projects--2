const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();


// Middleware
app.use(express.json());//without this we cant access req.body
app.use(cors());


// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/auth-fullstack-app")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


// Routes
app.use(authRoutes);


// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});