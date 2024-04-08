const db = require("../models");
const Skill = db.skills;
const Op = db.Sequelize.Op;

// Create and Save a new Skill
exports.create = (req, res) => {
  // Create a Skill
  Skill.create(req.body)
    .then((data) => {
      res.send({
        skill: data,
        message: "Skill posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Skill.",
      });
      console.log(err)
    });
};

// Retrieve all Skills from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Skill.findAll({
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

// Find a single Skill with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Skill.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Skill with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Skill",
      });
      console.log(">> Error while retrieving Skill: ", err);
    });
};

// Update a Skill by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Skill.update(req.body, {
    where: { SkillID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Skill was updated successfully.",
        });
      } else {
        res.send({
          message: `Skill was not found!`,
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
        message: "Error while updating Skill",
      });
      console.log(">> Error while updating Skill: ", err);
    });
};

// Delete a Skill with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Skill.destroy({
    where: { SkillID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Skill was deleted successfully!",
        });
      } else {
        res.send({
          message: `Skill was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Skill",
      });
      console.log(">> Error while deleting Skill: ", err);
    });
};

// Delete all Skills from the database.
exports.deleteAll = (req, res) => {
  Skill.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Skills were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Skills: ", err);
    });
};
