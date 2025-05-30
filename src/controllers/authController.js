const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userModel = require('../models/userModel');
const db = require('../models/db');

exports.login = async (req, res, next) => {
  try {

    const email = req.body?.email;
    const password = req.body?.password;


    if (!email || email == null) {
      throw new Error("Email id is required")
    }

    const user = await userModel.findUserByEmail(email);
    console.log(user)
    if (!user || user.password !== password) return res.status(401).json({ message: 'Invalid credentials' });


    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET)
    console.log(email);

    res.cookie("token", token, { maxAge: 1 * 12 * 60 * 60 * 1000 })

    res.json({
      role: user.role,
      user: {
        username: user.username,
        email: user.email
      }
    });
  }
  catch (err) {
    next(err)
  }
};


exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!email || !password || !username || !role) {
      return res.status(400).json({ message: 'Username, email, password, and role are required.' });
    }

    if (!['customer', 'banker'].includes(role)) {
      return res.status(400).json({ message: 'Role must be either customer or banker.' });
    }

    // Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    // Save user to DB
    const newUser = await userModel.createUser({ username, email, password, role });

    const token = await jwt.sign({ id: newUser.id }, process.env.JWT_SECRET)

    res.cookie({ token }, { maxAge: 1 * 12 * 60 * 60 * 1000 })

    return res.status(201).json({ message: 'User created successfully', role });
  } catch (err) {
    next(err);
  }
};


