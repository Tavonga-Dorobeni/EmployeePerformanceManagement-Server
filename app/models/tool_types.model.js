module.exports = (sequelize, Sequelize) => {
    const ToolType = sequelize.define("tool_type", {
      ToolTypeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return ToolType;
  };
  