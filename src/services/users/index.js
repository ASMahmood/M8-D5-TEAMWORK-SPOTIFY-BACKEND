const express = require("express");
const { authenticate, verifyJWT } = require("../auth/tools");
const { authorize } = require("../auth/middleware");
const passport = require("passport");
require("../auth/oauth");

const UserModel = require("./schema");

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    const { _id } = await newUser.save();
    res.send(_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password);
    console.log(user);
    const token = await authenticate(user);
    console.log(token.token);
    res
      .cookie("token", token.token, {
        httpOnly: true,
      })
      .send({ message: "logged in" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get(
  "/3rdparty/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
  })
);

usersRouter.get(
  "/3rdparty/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);

usersRouter.get(
  "/3rdparty/spotify/redirect",
  passport.authenticate("spotify"),
  async (req, res, next) => {
    try {
      res.cookie("token", req.user.tokens.token, {
        httpOnly: true,
      });
      res.status(200).redirect("http://localhost:3000/");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

usersRouter.get(
  "/3rdparty/facebook/redirect",
  passport.authenticate("facebook"),
  async (req, res, next) => {
    try {
      res.cookie("token", req.user.tokens.token, {
        httpOnly: true,
      });
      res.status(200).redirect("http://localhost:3000/");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

usersRouter.get("/homepage/login/help/me", async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedToken = await verifyJWT(token);
    const user = await UserModel.findOne({ _id: decodedToken._id });
    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = usersRouter;
