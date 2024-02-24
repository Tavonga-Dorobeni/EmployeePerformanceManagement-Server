const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

// Create and Save a new User
exports.create = (req, res) => {
  // Create a User
  User.create(req.body)
    .then((data) => {
      res.send({ User: data, message: "User posted successfully" });
    })
    .catch(db.Sequelize.UniqueConstraintError, (err) => {
      res.status(500).send({
        message: `Duplication Error Occured. "${err.errors[0].value}" already exists!!`,
      });
      console.log(">> Duplication Error occured: ", err);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({
    where: condition,
    include: [
      {
        all: true,
        nested: true
      }
    ],
    raw: false
  })
  .then(data => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Users.",
    });
  });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving User",
      });
      console.log(">> Error while retrieving User: ", err);
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if(req.body.newpassword != ''){
    req.body.password = bcrypt.hashSync(req.body.newpassword, 8)
  }

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while updating User",
      });
      console.log(">> Error while updating User: ", err);
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User",
      });
      console.log(">> Error while deleting User: ", err);
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all Users.",
      });
      console.log(">> Error while deleting all Users: ", err);
    });
};
