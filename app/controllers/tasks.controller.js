const db = require("../models");
const Task = db.tasks;
const TaskSkills = db.task_skills;
const TaskActivities = db.task_activities;
const EmployeeTasks = db.employee_tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    // Create a Task
    await Task.create(req.body.task, { transaction: t })

    const data = await Task.findOne({
      where: {},
      order: [ [ 'createdAt', 'DESC' ]],
      transaction: t
    });

    for (let i = 0; i < req.body.skills.length; i++) {
      await TaskSkills.create({
        TaskID: data.TaskID,
        SkillID: req.body.skills[i]
      }, { transaction: t })
    }

    const task = await Task.findOne({
      where: {TaskID: data.TaskID},
      include: [
        {
          all: true,
          nested: true
        }
      ],
      raw: false,
      transaction: t
    })

    res.send({
      task: task,
      message: "Task posted successfully",
    });
    await t.commit();    
  } catch (error) {
    res.status(500).send({
      message:
      error.message || "Some error occurred while creating the Task.",
    });
    console.log(error)    
    await t.rollback();
  }
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Task.findAll({
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

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Task",
      });
      console.log(">> Error while retrieving Task: ", err);
    });
};

// Update a Task by the id in the request
exports.update = async (req, res) => {
  const t = await db.sequelize.transaction();
  const id = req.params.id;

  try {
    await Task.update(req.body, {
      where: { TaskID: id },
      transaction: t
    });

    await TaskSkills.destroy({
      where: {
        TaskID: id
      },
      transaction: t
    })

    for (let i = 0; i < req.body.skills.length; i++) {
      await TaskSkills.create({
        TaskID: id,
        SkillID: req.body.skills[i]
      }, { transaction: t })
    }

    res.send({message: "Task was updated successfully.",});
    await t.commit();
  } catch (error) {
    res.status(500).send({message: "Error while updating Task",});
    console.log(">> Error while updating Task: ", error);
    await t.rollback();
  }
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { TaskID: id },
  })
    .then((num) => {
      TaskSkills.destroy({
        where: { TaskID: id },
      });
      EmployeeTasks.destroy({
        where: { TaskID: id },
      });
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        res.send({
          message: `Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task",
      });
      console.log(">> Error while deleting Task: ", err);
    });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
  Task.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tasks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Tasks: ", err);
    });
};



// Create and Save a new Task Activity
exports.createTaskActivity = (req, res) => {
  // Create a Task Activity
  TaskActivities.create(req.body)
    .then((data) => {
      res.send({
        activity: data,
        message: "Task Activity posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task Activity.",
      });
      console.log(err)
    });
};

// Retrieve all TaskActivities from the database.
exports.findAllTaskActivities = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  TaskActivities.findAll({
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

// Find a single Task Activity with an id
exports.findOneTaskActivity = (req, res) => {
  const id = req.params.id;

  TaskActivities.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task Activity with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Task Activity",
      });
      console.log(">> Error while retrieving Task Activity: ", err);
    });
};

// Update a Task Activity by the id in the request
exports.updateTaskActivity = (req, res) => {
  const id = req.params.id;

  TaskActivities.update(req.body, {
    where: { TaskActivityID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task Activity was updated successfully.",
        });
      } else {
        res.send({
          message: `Task Activity was not found!`,
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
        message: "Error while updating Task Activity",
      });
      console.log(">> Error while updating Task Activity: ", err);
    });
};

// Delete a Task Activity with the specified id in the request
exports.deleteTaskActivity = (req, res) => {
  const id = req.params.id;

  TaskActivities.destroy({
    where: { TaskActivityID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task Activity was deleted successfully!",
        });
      } else {
        res.send({
          message: `Task Activity was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task Activity",
      });
      console.log(">> Error while deleting Task Activity: ", err);
    });
};