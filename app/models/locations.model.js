module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
      LocationID: {
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
  
    return Location;
  };
  