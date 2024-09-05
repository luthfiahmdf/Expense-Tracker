const jsonwebtoken = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const verification = jsonwebtoken.verify(
      accessToken,
      process.env.JWT_SECRET
    );
    console.log(verification);
    req.user = verification;
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
    return;
  }
  next();
};

module.exports = auth;
