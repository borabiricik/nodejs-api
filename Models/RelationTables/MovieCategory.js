const { DataTypes } = require("sequelize");
const sequelize = require("../../connection");
const Category = require("../Category");
const Movie = require("../Movie");

const MovieCategory = sequelize.define(
  "MovieCategory",
  {
    MovieId: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie,
        key: "id",
      },
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  { timestamps: false }
);

Category.belongsToMany(Movie, { through: MovieCategory });
Movie.belongsToMany(Category, { through: MovieCategory });
module.exports = MovieCategory;
