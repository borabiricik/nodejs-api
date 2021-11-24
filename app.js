const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const sequelize = require("./connection");
const hataMiddleware = require("./Middlewares/ErrorMiddleware");
const User = require("./Models/User");
const ApiRouter = require("./Routes/ApiRouter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config");
const veriyToken = require("./Middlewares/VerifyToken")

app.use(bodyParser.json());
app.set("api_key",config.api_key)

try {
    sequelize.sync({ force: false, alter: false });
  } catch (error) {
    console.log(error.message);
  }

app.use("/api",veriyToken)
app.use(hataMiddleware);

app.use("/api", ApiRouter);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({
      username,
      password,
    });
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    next({ message: "User not found!" });
  } else {
    await bcrypt.compare(password, user.password).then((result) => {
      if (!result) {
        next({ message: "Password not found!" });
      }
      else{
        const token = jwt.sign({ username }, app.get("api_key"), {
            expiresIn: 720,
          });
          res.send({
              status:true,
              token
          })
      }
      
    });
  }
});




app.listen(3000);
