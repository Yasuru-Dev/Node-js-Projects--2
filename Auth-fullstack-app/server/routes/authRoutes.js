const express = require("express");
const bcrypt = require("bcrypt");           
const User = require("../models/User");     

const router = express.Router();//important for creating routes

// TEST ROUTE
router.get("/", (req, res) => {//this mean homepage of auth route
    res.send("Auth Route Working");
});

// REGISTER ROUTE
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Registration successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

//login route
router.post("/login", async (req, res) => {

    try {

        // GET DATA
        const { username, password } = req.body;


        // FIND USER
        const user = await User.findOne({ username });


        // CHECK USER EXISTS
        if (!user) {
            return res.send("User not found");
        }


        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.send("Invalid password");
        }


        // LOGIN SUCCESS
        res.send("Login successful");


    } catch (error) {

        console.log(error);

        res.send("Something went wrong");

    }

});

module.exports = router;