module.exports = (sequelize, Sequelize) => {
    const Tool = sequelize.define("tool", {
      ToolID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      SerialNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ToolTypeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      SectionID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      LocationID: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      Range: {
        type: Sequelize.STRING,
        allowNull: true
      },
      LastCallibration: {
        type: Sequelize.DATE,
        allowNull: true
      },
      NextCallibration: {
        type: Sequelize.DATE,
        allowNull: true
      },
      NotificationTimeline:{
        type: Sequelize.INTEGER,
        allowNull: true
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  
    return Tool;
  };
  