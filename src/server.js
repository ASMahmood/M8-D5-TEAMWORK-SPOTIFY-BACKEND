const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const catchAllHandler = require("./errorHandler");

const deezerRouter = require("./deezer-crud");

const server = express();
const port = process.env.PORT || 3003;

server.use(cors());
server.use(express.json());

server.use("/deezer", deezerRouter);

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
