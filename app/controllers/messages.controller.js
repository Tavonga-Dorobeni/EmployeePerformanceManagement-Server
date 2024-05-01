const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;

// Create and Save a new Message
exports.create = (req, res) => {
  // Create a Message
  Message.create(req.body)
    .then((data) => {
      res.send({
        msg: data,
        message: "Message posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
      console.log(err)
    });
};

// Retrieve all Messages from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Message.findAll({
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

// Find a single Message with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Message.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Message with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Message",
      });
      console.log(">> Error while retrieving Message: ", err);
    });
};

// Update a Message by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Message.update(req.body, {
    where: { MessageID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Message was updated successfully.",
        });
      } else {
        res.send({
          message: `Message was not found!`,
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
        message: "Error while updating Message",
      });
      console.log(">> Error while updating Message: ", err);
    });
};

// Delete a Message with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Message.destroy({
    where: { MessageID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Message was deleted successfully!",
        });
      } else {
        res.send({
          message: `Message was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Message",
      });
      console.log(">> Error while deleting Message: ", err);
    });
};

// Delete all Messages from the database.
exports.deleteAll = (req, res) => {
  Message.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Messages were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Messages: ", err);
    });
};
