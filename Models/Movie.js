const { DataTypes } = require("sequelize");
const { Joi, sequelizeJoi } = require("sequelize-joi");
const Category = require("./Category")
const sequelize = require("../connection");

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      schema: Joi.string().trim().min(3).max(80),
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      schema: Joi.string().trim(),
    },
    score:{
      type:DataTypes.FLOAT,
      allowNull:true,
      defaultValue:0.0,
      schema: Joi.number().max(10.0).min(0.0)
    },
    release_date:{
      type:DataTypes.INTEGER,
      defaultValue: new Date().getFullYear(),
      allowNull:false
    }
  },
  {
    timestamps: false,
  }
);

Movie.hasMany(Category)

sequelizeJoi(Movie);

module.exports = Movie;
