const express = require("express");
const axios = require("axios");
const { authorize } = require("../services/auth/middleware");

const deezerRouter = express.Router();

deezerRouter.get("/artists/:genre", authorize, async (req, res, next) => {
  try {
    await axios
      .get(
        `https://deezerdevs-deezer.p.rapidapi.com/genre/` +
          req.params.genre +
          `/artists`,
        {
          headers: {
            "x-rapidapi-key": process.env.DEEZER_KEY,
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      )
      .then((response) => res.send(response.data.data));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

deezerRouter.get("/album/:albumID", authorize, async (req, res, next) => {
  try {
    await axios
      .get(
        `https://deezerdevs-deezer.p.rapidapi.com/album/` + req.params.albumID,
        {
          headers: {
            "x-rapidapi-key": process.env.DEEZER_KEY,
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      )
      .then((response) => res.send(response.data));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

deezerRouter.get(
  "/artists/:artistID/toptracks",
  authorize,
  async (req, res, next) => {
    try {
      await axios
        .get(
          `https://deezerdevs-deezer.p.rapidapi.com/artist/` +
            req.params.artistID +
            `/top?limit=50`,
          {
            headers: {
              "x-rapidapi-key": process.env.DEEZER_KEY,
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            },
          }
        )
        .then((response) => res.send(response.data.data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

deezerRouter.get(
  "/artists/:artistID/albums",
  authorize,
  async (req, res, next) => {
    try {
      await axios
        .get(
          `https://deezerdevs-deezer.p.rapidapi.com/artist/` +
            req.params.artistID +
            `/albums`,
          {
            headers: {
              "x-rapidapi-key": process.env.DEEZER_KEY,
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            },
          }
        )
        .then((response) => res.send(response.data.data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

deezerRouter.get(
  "/artists/:artistID/profile",
  authorize,
  async (req, res, next) => {
    try {
      await axios
        .get(
          `https://deezerdevs-deezer.p.rapidapi.com/artist/` +
            req.params.artistID,
          {
            headers: {
              "x-rapidapi-key": process.env.DEEZER_KEY,
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            },
          }
        )
        .then((response) => res.send(response.data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = deezerRouter;
