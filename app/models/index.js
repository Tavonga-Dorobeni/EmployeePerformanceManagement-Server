const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.employees = require("../models/employee.model.js")(sequelize, Sequelize);
db.tasks = require("../models/tasks.model.js")(sequelize, Sequelize);
db.skills = require("../models/skills.model.js")(sequelize, Sequelize);
db.sites = require("../models/sites.model.js")(sequelize, Sequelize);
db.employee_tasks = require("../models/employee_tasks.model.js")(sequelize, Sequelize);
db.employee_skills = require("../models/employee_skills.model.js")(sequelize, Sequelize);
db.task_skills = require("../models/task_skills.model.js")(sequelize, Sequelize);
db.task_activities = require("../models/task_activities.model.js")(sequelize, Sequelize);

db.employees.hasMany(db.employee_skills, {
  as: "skills",
  foreignKey: "EmployeeID",
}, {foreignKeyConstraint: true});

db.employees.hasMany(db.employee_tasks, {
  as: "tasks",
  foreignKey: "EmployeeID",
}, {foreignKeyConstraint: true});

db.tasks.hasMany(db.task_skills, {
  as: "skills",
  foreignKey: "TaskID",
}, {foreignKeyConstraint: true});

db.tasks.hasMany(db.task_activities, {
  as: "activities",
  foreignKey: "TaskID",
}, {foreignKeyConstraint: true});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
