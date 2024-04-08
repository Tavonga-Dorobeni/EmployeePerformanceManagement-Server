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
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      Longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true
      }
    });
  
    return Employee;
  };