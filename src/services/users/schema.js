const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: String,
    surname: String,
    imgUrl: String,
    favorites: [],
    email: String,
    password: String,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  const plainPW = user.password;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(plainPW, 8);
  }
  next();
});

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return user;
    else return null;
  } else {
    return null;
  }
};

module.exports = model("user", UserSchema)
