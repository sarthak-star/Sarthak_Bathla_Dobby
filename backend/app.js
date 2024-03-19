const express = require("express");


const app = express();

app.use(express.json());

const userroutes = require("./routes/userroutes");
const imagesroutes = require("./routes/imageroutes");

app.use("/api/v1" , imagesroutes);
app.use("/api/v1" , userroutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

module.exports = app;