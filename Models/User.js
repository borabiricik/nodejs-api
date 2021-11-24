const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const useBcrypt = require("sequelize-bcrypt");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    allowNull:false,
    primaryKey:true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{timestamps:false});

useBcrypt(User, { field: "password" });

module.exports = User;
