const db = require('./db');

exports.findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
};


exports.getAllCustomers = async () => {
  const [rows] = await db.query('SELECT * FROM Users WHERE role = ?', ['customer']);
  return rows;
};

exports.createUser = async ({ username, email, password, role }) => {
  const [result] = await db.query(
    'INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, password, role]
  );
  return { id: result.insertId, username, email, role };
};
