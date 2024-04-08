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
    },
    StartDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    EndDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    Status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Pending"
    }
  });

  return Task;
};
