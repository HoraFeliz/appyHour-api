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

module.exports.list = (req, res, next) => {
  Tour.find()
    .then((tours) => {
      res.json(tours);
    })
    .catch((e) => next(e));
};

module.exports.edit = (req, res, next) => {
  Product.findById(req.params.id)
    .then((p) => {
      if (p.user != req.currentUser.id) {
        throw createError(403, "You can't edit another user's products");
      } else {
        return p.update(req.body).then((editedProduct) => {
          res.json(editedProduct);
        });
      }
    })
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  Tour.findById(req.params.id)
    .then((t) => {
      if (!t) {
        throw createError(404, "Tour not found");
      } else {
        return p.delete().then(() => {
          res.json({});
        });
      }
    })
    .catch((e) => next(e));
};
