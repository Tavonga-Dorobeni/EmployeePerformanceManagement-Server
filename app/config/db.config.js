module.exports = {
  HOST: process.env.MYSQL_HOST || "localhost",
  USER: process.env.MYSQL_USER || "root",
  PASSWORD: process.env.MYSQL_PASS || "MySQLR00tP@55202two",
  DB: process.env.MYSQL_DB || "gats",

  // HOST: "194.233.164.50",
  // USER: "root",
  // PASSWORD: "MySQLR00tP@55202two",
  // DB: "callibration_automation",
  // PORT: "32768",

  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};