const bodyParser = require("body-parser");
const { Op } = require("sequelize");
const Category = require("../models/Category");
const Movie = require("../Models/Movie");
const MovieCategory = require("../Models/RelationTables/MovieCategory");
const app = require("express").Router();
app.use(bodyParser.json());

app.get("/", async (req, res, next) => {
  const movies = await Movie.findAll();
  if (movies) res.json(movies);
  else next({ message: "Film Bulunamadı" });
});

app.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findOne({
      where: {
        id: req.params.id,
      },
      include: Category,
    });
    if (movie) res.json(movie);
    else next({ message: "Film Bulunamadı" });
  } catch (error) {
    next({ error: error.message });
  }
});

app.get("/:start_date/:end_date", async (req, res, next) => {
  const { start_date, end_date } = req.params;
  const movies = await Movie.findAll({
    where: {
      release_date: {
        [Op.between]: [start_date, end_date],
      },
    },
  });
  res.json(movies);
});

app.post("/", async (req, res) => {
  try {
    var newMovie = await Movie.create(req.body);
    res.json(newMovie);
  } catch (error) {
    res.send(error.message);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    var deletedMovie = await Movie.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedMovie);
  } catch (error) {
    res.send(error.message);
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ updatedMovie });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = app;
