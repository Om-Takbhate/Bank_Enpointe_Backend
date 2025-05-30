const userModel = require('../models/userModel');
const accountModel = require('../models/accountModel');

exports.getAllCustomers = async (req, res) => {
  const users = await userModel.getAllCustomers();
  res.json(users);
};

exports.getUserTransactions = async (req, res) => {
  const userId = req.params.userId;
  const transactions = await accountModel.getTransactionsByUserId(userId);
  res.json(transactions);
};
