const app = require("express").Router()
const MovieRouter = require("./MovieRouter")

app.use("/movies",MovieRouter)

module.exports = app