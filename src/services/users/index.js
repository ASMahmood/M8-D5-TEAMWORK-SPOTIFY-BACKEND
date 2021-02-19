const express = require("express");
const { authenticate } = require("../auth/tools");
const { authorize } = require("../auth/middleware")

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

usersRouter.post("/login", async (req,res,next) =>{
    try {
        const { email, password } = req.body;
        const user = await UserModel.findByCredentials(email, password)
        console.log(user)
        const token = await authenticate(user)
        res.send(token)
    } catch (error) {
        console.log(error)
        next(error)
    }
})


module.exports = usersRouter;
