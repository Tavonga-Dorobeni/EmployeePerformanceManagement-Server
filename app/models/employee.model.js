module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      EmployeeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      JobTitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      SiteID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Latitude: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Longitude: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  
    return Employee;
  };