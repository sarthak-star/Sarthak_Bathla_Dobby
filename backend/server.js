const app = require("./app");
const dotenv = require("dotenv");
const connectDB= require("./database/dbconnect");
dotenv.config({path : "backend/config/config.env" });



connectDB();


app.listen(process.env.PORT , console.log(`Server is running on PORT ${process.env.PORT}`));