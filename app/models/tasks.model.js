module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    TaskID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    SiteID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    EmployeeID: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    Description: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  return Task;
};
