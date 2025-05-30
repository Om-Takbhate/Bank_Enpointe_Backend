const db = require('./db');

exports.getTransactionsByUserId = async (userId) => {
  const [rows] = await db.query('SELECT * FROM Accounts WHERE user_id = ? ORDER BY created_at DESC', [userId]);
  return rows;
};

exports.addTransaction = async (userId, type, amount, balance) => {
  await db.query('INSERT INTO Accounts (user_id, type, amount, balance) VALUES (?, ?, ?, ?)', [userId, type, amount, balance]);
};

exports.getLatestBalance = async (userId) => {
  const [rows] = await db.query('SELECT balance FROM Accounts WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [userId]);
  return rows[0] ? rows[0].balance : 0;
};
