const bodyParser = require("body-parser");
const express = require("express")
const app = express();
const sequelize = require("./connection");
const hataMiddleware = require("./Middlewares/ErrorMiddleware");
const Movie = require("./Models/Movie");
const MainRouter = require("./Routes/MainRouter");

try {
    sequelize.sync({force:false,alter:false})
} catch (error) {
    console.log(error.message)
}

app.use(hataMiddleware)

app.use("/api", MainRouter);



app.listen(3000);
