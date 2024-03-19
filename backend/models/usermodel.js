// backend/models/userModel.js

const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a Password"],
        select: false
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.getJWTtoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

userSchema.methods.comparePass = async function (enteredPass) {

    return await bcrypt.compare(enteredPass, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
