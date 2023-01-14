const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    // _id: String,
    googleId: String,
    email: String,
    password: String,
    fName: String,
    lName: String,
    branch: String,
    year: String,
    noOfDoubtsAsked: Number,
    noOfDoubtsAnswered: Number,
    isAdmin: Boolean,
    avatar: String
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("users", userSchema);

