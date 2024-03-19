// backend/models/userModel.js

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: [true, "Please upload image"]
    },

});


const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
