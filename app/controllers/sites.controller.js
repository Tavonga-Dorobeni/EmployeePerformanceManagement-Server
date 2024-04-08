const db = require("../models");
const Site = db.sites;
const Op = db.Sequelize.Op;

// Create and Save a new Site
exports.create = (req, res) => {
  // Create a Site
  Site.create(req.body)
    .then((data) => {
      res.send({
        site: data,
        message: "Site posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Site.",
      });
      console.log(err)
    });
};

// Retrieve all Sites from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Site.findAll({
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

// Find a single Site with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Site.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Site with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Site",
      });
      console.log(">> Error while retrieving Site: ", err);
    });
};

// Update a Site by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Site.update(req.body, {
    where: { SiteID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Site was updated successfully.",
        });
      } else {
        res.send({
          message: `Site was not found!`,
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
        message: "Error while updating Site",
      });
      console.log(">> Error while updating Site: ", err);
    });
};

// Delete a Site with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Site.destroy({
    where: { SiteID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Site was deleted successfully!",
        });
      } else {
        res.send({
          message: `Site was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Site",
      });
      console.log(">> Error while deleting Site: ", err);
    });
};

// Delete all Sites from the database.
exports.deleteAll = (req, res) => {
  Site.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Sites were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Sites: ", err);
    });
};
