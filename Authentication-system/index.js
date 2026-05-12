const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

//connect to mongodb

mongoose.connect("mongodb://localhost:27017/userapi")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

//user schema 
const userSchema1 = new mongoose.Schema({
    username : String,
    password : String
});

//Model
const User1 = mongoose.model("User1", userSchema1);

//register part
app.post("/register", async(req,res) => {

try{
    //get data from user
    const {username ,password} =req.body;
    const existingUser = await User1.findOne({username});
    if(existingUser){
        return res.send("User alreday exists");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password,10);

    //create new user
    const newUser = new User1({
        username,
        password: hashedPassword
    });

    //save user 
    await newUser.save();

    //success response
    res.send("registration successful");
}
catch(error){
    console.log(error);
    res.send("something went wrong");
}
});

app.listen(3000, () => {
    console.log("server running on port 3000");
});