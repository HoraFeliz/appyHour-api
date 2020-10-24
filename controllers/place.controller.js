const Place = require("../models/place.model");
const User = require("../models/user.model");

module.exports.save = (req, res, next) => {
  const place = new Place({
    ...req.body,
  });

  place
    .save()
    .then((p) => {
      res.json(p);
    })
    .catch((error) => {
      if (false) {
        User.find({ staff: true })
          .then((staffUsers) => {
            throw createError(404, "Tour not found");
          })
          .catch(next);
      } else {
        next(error);
      }
    });
};
