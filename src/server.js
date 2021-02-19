const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require("./services/users");

const server = express();
const port = process.env.PORT || 3003;

server.use(cors());
server.use(express.json());
server.use("/users", usersRouter);

console.log(listEndpoints(server));
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
