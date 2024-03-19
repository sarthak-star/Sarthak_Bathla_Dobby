const express = require("express");
const { uploadImage , getMyImages } = require("../controllers/imagecontroller")
const { protect } = require("../middleware/authmiddleware")

const router = express.Router();

router.route("/upload").post(protect,uploadImage);

router.route("/myimages").get(protect ,getMyImages);

module.exports = router;