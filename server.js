const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + "/public/";
const app = express();

global.__basedir = __dirname;

app.use(express.static(path));

// var SequelizeAuto = require('sequelize-auto')
// var auto = new SequelizeAuto('efm', 'root', 'MySQLDockerPass2020.', {
//   host: "db",
//   dialect: 'mysql',
//   directory: false,
//   additional: {
//     timestamps: false
//   },
// })
// auto.run(function (err) {
//   if (err) throw err;
// });

// var whitelist = ['http://localhost:8081']
// var corsOptions = {

//   // origin: "http://localhost:8081"
//   // origin: "https://abcam.efm.co.zw"
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// };
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "5mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

// simple route
app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

require("./app/routes/auth.routes")(app);
require("./app/routes/access.routes")(app);
require("./app/routes/user.routes")(app);

require("./app/routes/employees.routes")(app);
require("./app/routes/sites.routes")(app);
require("./app/routes/skills.routes")(app);
require("./app/routes/tasks.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const io = socket(server);
// io.on("connection", controller.newupdate );

var whitelist = ['http://localhost:8081', 'http://localhost:8082']

const io = require("socket.io")(server, {
  cors: {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    transports: ['websocket', 'polling'],
    methods: ["GET", "POST"],
  },
  allowEIO3: true
});

io.on("connection", (socket) => {
  console.log(`Made socket connection ${socket.id}`);
  socket.on("setlocation", function (data) {
    console.log(`broadcasting data: ${data}`);
    socket.broadcast.emit("locationres", data);
  });
  socket.on("socketreq", function (data) {
    console.log(`broadcasting data: ${data}`);
    socket.broadcast.emit("socketres", data);
  });
  socket.on("socketlogoutreq", function () {
    socket.broadcast.emit("socketlogoutres");
  });
});
