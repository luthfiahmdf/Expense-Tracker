const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const userModel = mongoose.model("User");

  const { name, email, password, confirmPassword, balance } = req.body;
  // validation
  if (!email) throw "Email is required";
  if (!password) throw "Password is required";
  if (!password.length >= 6) throw "Password must be at least 6 characters";
  if (password !== confirmPassword)
    throw "Password and confirm password does not match";
  if (!name) throw "Name is required";
  if (!balance) throw "Balance is required";

  const getDuplicateEmail = await userModel.findOne({ email: email });
  if (getDuplicateEmail) throw "Email already exists";
  const hashedPassword = await bcrypt.hash(password, 12);
  await userModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  res.status(200).json({
    status: "success",
    message: "User registered successfully",
  });
};

module.exports = register;
