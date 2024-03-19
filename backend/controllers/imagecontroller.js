const expressAsyncHandler = require("express-async-handler");
const Images = require("../models/imagemodel");


exports.uploadImage = expressAsyncHandler(
    async (req, res) => {
        const user = req.user;
        const { name, imageURL } = req.body;

        const image = await Images.create({
            user: user._id,
            name,
            imageURL
        });

        res.status(200).json({
            success: true,
            image
        })
    }
)

exports.getMyImages = expressAsyncHandler(
    async (req, res) => {
        console.log(req);
        const user = req.user;
        const userImages = await Images.find({ user: user._id });

        res.status(200).json({
            success: true,
            userImages
        });
    }
)