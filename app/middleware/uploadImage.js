const util = require("util");
const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/Images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter }).single("file");
let uploadImageMiddleware = util.promisify(uploadImage);
module.exports = uploadImageMiddleware;
