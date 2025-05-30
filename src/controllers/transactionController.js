const accountModel = require('../models/accountModel');

exports.getTransactions = async (req, res) => {
  const userId = req.user.id;
  const transactions = await accountModel.getTransactionsByUserId(userId);
  res.json(transactions);
};

exports.deposit = async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;

  const balance = await accountModel.getLatestBalance(userId);
  const newBalance = balance + Number(amount);

  await accountModel.addTransaction(userId, 'deposit', amount, newBalance);
  res.json({ message: 'Deposit successful', balance: newBalance });
};

exports.withdraw = async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;

  const balance = await accountModel.getLatestBalance(userId);
  if (amount > balance) {
    return res.status(400).json({ message: 'Insufficient Funds' });
  }

  const newBalance = balance - Number(amount);
  await accountModel.addTransaction(userId, 'withdraw', amount, newBalance);
  res.json({ message: 'Withdrawal successful', balance: newBalance });
};
