const {Sequelize} = require("sequelize");

const sequelize = new Sequelize({
    dialect:"postgres",
    host:"localhost",
    username:"postgres",
    password:"lolbora123",
    database:"MovieDB",
    logging:true
})

module.exports = sequelize