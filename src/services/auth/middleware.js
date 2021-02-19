const jwt = require("jsonwebtoken");
const UserModel = require("../users/schema");
const { verifyJWT } = require("./tools");

const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = await verifyJWT(token);
    const user = await UserModel.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    const err = new Error("Please Authenticate");
    console.log(err);
    next(err);
  }
};

module.exports = { authorize };
