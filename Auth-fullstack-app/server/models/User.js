const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: String,

    password: String

});

const User = mongoose.model("User", userSchema);

module.exports = User;//alllow other files to use this model