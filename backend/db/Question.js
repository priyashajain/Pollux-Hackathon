const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    // _id: String,
    content: String,
    category: String,
    approved: Boolean,
    notified: Boolean,
    // userId: String
    // user: {
    //     _id: String,
    //     email: String,
    //     // password: String,
    //     fName: String,
    //     lName: String,
    //     branch: String,
    //     year: String,
    //     avatar: String
    // }
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});


module.exports = mongoose.model("questions", questionSchema);