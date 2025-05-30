const db = require('../models/db'); // Adjust the path if needed

async function createUsersTable() {
  try {
    // // First, create the database if it doesn't exist
    // await db.query('CREATE DATABASE IF NOT EXISTS Bank');
    
    // // Select the Bank database for the connection
    // await db.query('USE Bank');
    
    // Create the Users table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('customer', 'banker') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await db.query(createTableQuery);

    console.log('Users table created successfully.');
  } catch (error) {
    console.error('Error creating Users table:', error);
  } finally {
    // Close the db to end the program if this is a one-time script
    await db.end();
  }
}

createUsersTable();
