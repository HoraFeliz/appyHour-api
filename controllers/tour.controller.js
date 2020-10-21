const Tour = require("../models/tour.model");
const mongoose = require("mongoose");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const tour = new Tour({
    ...req.body,
    creator: req.session.user.id,
  });

  tour
    .save()
    .then((t) => {
      res.json(t);
    })
    .catch((e) => next(e));
};

module.exports.list = (req, res, next) => {
  Tour.find()
    .then((tours) => {
      res.json(tours);
    })
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  Tour.findById(req.params.id)
    .then((t) => {
      if (!t) {
        throw createError(404, "Product not found");
      } else {
        if (t.creator != req.currentUser.id) {
          throw createError(
            403,
            "You cannot delete products that aren't yours"
          );
        } else {
          res.json({});
        }
      }
    })
    .catch((e) => next(e));
};
