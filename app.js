require("express-async-errors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const errorHandlers = require("./handlers/errorHandlers");
const userRoutes = require("./modules/users/users.routes");

const app = express();
// models
require("./models/user.model");
app.use(express.json());
//  routes
app.use("/api/users", userRoutes);

app.use(errorHandlers);
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
