const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const usersRouter = require("./services/users");
const deezerRouter = require("./deezer-crud");
const catchAllHandler = require("./errorHandler");

const server = express();
const port = process.env.PORT || 3003;

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

server.use(cors(corsOptions));
server.use(express.json());

server.use(passport.initialize());
server.use(cookieParser());



server.use("/users", usersRouter);

server.use("/deezer", deezerRouter);
console.log(listEndpoints(server));




server.use(catchAllHandler);

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("The server's power level is over ", port);
    })
  );
