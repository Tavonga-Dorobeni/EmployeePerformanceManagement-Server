const db = require("../models");
const Section = db.sections;
const Op = db.Sequelize.Op;

// Create and Save a new Section
exports.create = (req, res) => {
  // Create a Section
  Section.create(req.body)
    .then((data) => {
      res.send({
        section: data,
        message: "Section posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Section.",
      });
      console.log(err)
    });
};

// Retrieve all Sections from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Section.findAll({
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

// Find a single Section with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Section.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Section with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Section",
      });
      console.log(">> Error while retrieving Section: ", err);
    });
};

// Update a Section by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Section.update(req.body, {
    where: { SectionID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Section was updated successfully.",
        });
      } else {
        res.send({
          message: `Section was not found!`,
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
        message: "Error while updating Section",
      });
      console.log(">> Error while updating Section: ", err);
    });
};

// Delete a Section with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Section.destroy({
    where: { SectionID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Section was deleted successfully!",
        });
      } else {
        res.send({
          message: `Section was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Section",
      });
      console.log(">> Error while deleting Section: ", err);
    });
};

// Delete all Sections from the database.
exports.deleteAll = (req, res) => {
  Section.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Sections were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Sections: ", err);
    });
};
