const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  emailSecret: process.env.EMAIL_SECRET,
  userSecret: process.env.USER_SECRET,
  loginSecret: process.env.LOGIN_SECRET
};