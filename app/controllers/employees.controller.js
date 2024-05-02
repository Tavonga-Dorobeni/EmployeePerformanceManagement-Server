const db = require("../models");
const User = db.user;
const Role = db.role;
const Employee = db.employees;
const EmployeeTasks = db.employee_tasks;
const EmployeeSkills = db.employee_skills;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

// Create and Save a new Employee
exports.create = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    // Create a Employee
    await Employee.create(req.body.employee, { transaction: t })

    const user = {
      firstname: req.body.employee.FullName.split(" ")[0],
      lastname: req.body.employee.FullName.split(" ")[1],
      username: req.body.employee.Email,
      email: req.body.employee.Email,
      phone: req.body.employee.Phone,
      NationalID: req.body.employee.Phone,
      password: bcrypt.hashSync('Password', 8)
    }

    User.create(user)
    .then((user) => {
      Role.findAll({
        where: {
          name: 'Viewer',
        },
      }).then((roles) => {
        user.setRoles(roles);       
      });
    })

    const data = await Employee.findOne({
      where: {},
      order: [ [ 'createdAt', 'DESC' ]],
      transaction: t
    });

    for (let i = 0; i < req.body.skills.length; i++) {
      await EmployeeSkills.create({
        EmployeeID: data.EmployeeID,
        SkillID: req.body.skills[i]
      }, { transaction: t })
    }

    const employee = await Employee.findOne({
      where: {EmployeeID: data.EmployeeID},
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
      employee: employee,
      message: "Employee posted successfully",
    });
    await t.commit();    
  } catch (error) {
    res.status(500).send({
      message:
      error.message || "Some error occurred while creating the Employee.",
    });
    console.log(error)    
    await t.rollback();
  }
};

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Employee.findAll({
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

// Find a single Employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Employee with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Employee",
      });
      console.log(">> Error while retrieving Employee: ", err);
    });
};

// Update a Employee by the id in the request
exports.update = async (req, res) => {
  const t = await db.sequelize.transaction();
  const id = req.params.id;

  try {
    await Employee.update(req.body, {
      where: { EmployeeID: id },
      transaction: t
    });

    await EmployeeSkills.destroy({
      where: {
        EmployeeID: id
      },
      transaction: t
    })

    for (let i = 0; i < req.body.skills.length; i++) {
      await EmployeeSkills.create({
        EmployeeID: id,
        SkillID: req.body.skills[i].SkillID
      }, { transaction: t })
    }

    // await EmployeeTasks.destroy({
    //   where: {
    //     EmployeeID: id
    //   },
    //   transaction: t
    // })

    if(req.body.new_task) {
      await EmployeeTasks.create({
        EmployeeID: id,
        TaskID: req.body.new_task.TaskID
      }, { transaction: t })
    }

    res.send({message: "Employee was updated successfully.",});
    await t.commit();
  } catch (error) {
    res.status(500).send({message: "Error while updating Employee",});
    console.log(">> Error while updating Employee: ", error);
    await t.rollback();
  }
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { EmployeeID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!",
        });
      } else {
        res.send({
          message: `Employee was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Employee",
      });
      console.log(">> Error while deleting Employee: ", err);
    });
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  Employee.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Employees were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Employees: ", err);
    });
};
