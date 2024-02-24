const db = require("../models");
const Location = db.locations;
const Op = db.Sequelize.Op;

// Create and Save a new Location
exports.create = (req, res) => {
  // Create a Location
  Location.create(req.body)
    .then((data) => {
      res.send({
        location: data,
        message: "Location posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Location.",
      });
      console.log(err)
    });
};

// Retrieve all Locations from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Location.findAll({
  where: condition,
  include: [
    {
      all: true,
      nested: true
    }
  ],
  raw: false
})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving applications.",
      });
    });
};

// Find a single Location with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Location.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Location with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Location",
      });
      console.log(">> Error while retrieving Location: ", err);
    });
};

// Update a Location by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Location.update(req.body, {
    where: { LocationID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Location was updated successfully.",
        });
      } else {
        res.send({
          message: `Location was not found!`,
        });
      }
    })
    .catch(db.Sequelize.UniqueConstraintError, (err) => {
      res.status(500).send({
        message: `Duplication Error Occured. "${err.errors[0].value}" already exists!!`,
      });
      console.log(">> Duplication Error occured: ", err);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while updating Location",
      });
      console.log(">> Error while updating Location: ", err);
    });
};

// Delete a Location with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Location.destroy({
    where: { LocationID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Location was deleted successfully!",
        });
      } else {
        res.send({
          message: `Location was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Location",
      });
      console.log(">> Error while deleting Location: ", err);
    });
};

// Delete all Locations from the database.
exports.deleteAll = (req, res) => {
  Location.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Locations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Locations: ", err);
    });
};
