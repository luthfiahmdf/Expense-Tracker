const userDashboard = async (req, res) => {
  console.log(req.user);
  res.status(200).json({
    status: "success",
    message: "User Dashboard in successfully",
  });
};
module.exports = userDashboard;
