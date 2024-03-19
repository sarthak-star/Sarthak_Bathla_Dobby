const expressAsyncHandler = require("express-async-handler");
const User = require("../models/usermodel");
const sendToken = require("../config/generatetoken");
const { Error } = require("mongoose");

exports.registerUser = expressAsyncHandler(
    async (req, res) => {

        const { name, email, password } = req.body;

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(200).json({
            token:sendToken(user._id)
        })
    }
)

exports.loginUser = expressAsyncHandler(
    async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(500).json({
                success: false,
                error: "Please provide an Email and Password!"
            })
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(500).json({
                success: false,
                error: "Invalid Credentials! Please try again."
            })
        }



        const ispasswordmatched = user?.comparePass(password);

        if (!ispasswordmatched) {
            res.status(401).json({
                success: false,
                error: "Incorrect credentials provided!!",
            })
        }

        res.status(200).json({
            token:sendToken(user._id)
        })


    }
)

