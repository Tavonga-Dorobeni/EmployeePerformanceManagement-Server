const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

const pdfFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("application/pdf")) {
    cb(null, true);
  } else {
    cb("Please upload pdf only.", false);
  }
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  fileFilter: pdfFilter,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
