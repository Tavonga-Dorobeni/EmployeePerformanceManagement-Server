const db = require("../models");
const Tool = db.tools;
const Op = db.Sequelize.Op;

// Create and Save a new Tool
exports.create = (req, res) => {
  // Create a Tool
  Tool.create(req.body)
    .then((data) => {
      res.send({
        tool: data,
        message: "Tool posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tool.",
      });
      console.log(err)
    });
};

// Retrieve all Tools from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tool.findAll({
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

// Find a single Tool with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tool.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tool with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Tool",
      });
      console.log(">> Error while retrieving Tool: ", err);
    });
};

// Update a Tool by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tool.update(req.body, {
    where: { ToolID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tool was updated successfully.",
        });
      } else {
        res.send({
          message: `Tool was not found!`,
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
        message: "Error while updating Tool",
      });
      console.log(">> Error while updating Tool: ", err);
    });
};

// Delete a Tool with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tool.destroy({
    where: { ToolID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tool was deleted successfully!",
        });
      } else {
        res.send({
          message: `Tool was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tool",
      });
      console.log(">> Error while deleting Tool: ", err);
    });
};

// Delete all Tools from the database.
exports.deleteAll = (req, res) => {
  Tool.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tools were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Tools: ", err);
    });
};
