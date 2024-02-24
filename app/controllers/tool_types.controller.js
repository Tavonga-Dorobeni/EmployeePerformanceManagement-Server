const db = require("../models");
const ToolType = db.tool_types;
const Op = db.Sequelize.Op;

// Create and Save a new ToolType
exports.create = (req, res) => {
  // Create a ToolType
  ToolType.create(req.body)
    .then((data) => {
      res.send({
        tool_type: data,
        message: "ToolType posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ToolType.",
      });
      console.log(err)
    });
};

// Retrieve all ToolTypes from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  ToolType.findAll({
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

// Find a single ToolType with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ToolType.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ToolType with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving ToolType",
      });
      console.log(">> Error while retrieving ToolType: ", err);
    });
};

// Update a ToolType by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ToolType.update(req.body, {
    where: { ToolTypeID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ToolType was updated successfully.",
        });
      } else {
        res.send({
          message: `ToolType was not found!`,
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
        message: "Error while updating ToolType",
      });
      console.log(">> Error while updating ToolType: ", err);
    });
};

// Delete a ToolType with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ToolType.destroy({
    where: { ToolTypeID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ToolType was deleted successfully!",
        });
      } else {
        res.send({
          message: `ToolType was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ToolType",
      });
      console.log(">> Error while deleting ToolType: ", err);
    });
};

// Delete all ToolTypes from the database.
exports.deleteAll = (req, res) => {
  ToolType.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ToolTypes were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all ToolTypes: ", err);
    });
};
