const express = require("express");
const mongoose =  require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authroutes");

const app = express();

//middleware
app.use(express.json());//WITHOUT THIS WE CANT ACCESS REQ.BODY
app.use(cors());

//Mongodb conection
mongoose.connect("mongodb://localhost:27017/crud")
.then(() => {
    console.log("Mongo db connected");
})
.catch((err) => {
    console.log(err);

});

//routes
app.use(authRoutes);

//start server 
app.listen(3000, () => {
    console.log("server runnung on port 3000");
})