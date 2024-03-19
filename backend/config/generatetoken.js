const jwt = require("jsonwebtoken")

const sendToken = (user) =>{
    return jwt.sign({ id: user._id }, "Dobby", {
        expiresIn: '3d',
    });
}

module.exports = sendToken;