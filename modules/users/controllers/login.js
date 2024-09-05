const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { access } = require("fs");
const jsonwebtoken = require("jsonwebtoken");
const login = async (req, res) => {
  const userModel = mongoose.model("User");
  const { email, password } = req.body;
  const getUser = await userModel.findOne({ email: email });

  if (!getUser) throw "User not found";
  const comparePassword = await bcrypt.compare(password, getUser.password);
  if (!comparePassword) throw "Incorrect password";
  const accesToken = await jsonwebtoken.sign(
    {
      _id: getUser._id,
      name: getUser.name,
    },
    process.env.JWT_SECRET
  );
  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    accessToken: accesToken,
  });
};

module.exports = login;
