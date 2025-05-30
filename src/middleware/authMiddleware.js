const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const tokenHash = req.cookies;

  if (!tokenHash) return res.status(401).json({ message: 'No token provided' });

  const token = jwt.decode(tokenHash, process.env.JWT_SECRET)?.token

  const user = await userModel.getUserByToken(token);
  if (!user) return res.redirect("/login")

  req.user = user;
  next();
};
