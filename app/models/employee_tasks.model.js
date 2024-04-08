module.exports = (sequelize, Sequelize) => {
  const EmployeeTasks = sequelize.define("employee_tasks", {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    EmployeeID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    TaskID: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return EmployeeTasks;
};
