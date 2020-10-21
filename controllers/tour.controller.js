const Tour = require("../models/tour.model");
const mongoose = require("mongoose");

module.exports.create = (req, res, next) => {
  const tour = new Tour({
    ...req.body,
  });

  tour
    .save()
    .then((t) => {
      res.json(t);
    })
    .catch((e) => next(e));
};
