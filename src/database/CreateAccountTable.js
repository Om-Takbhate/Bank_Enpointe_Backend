const db = require('../models/db'); // Adjust the path if needed

async function createUsersTable() {
    try {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Accounts (
            trans_id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT,
            trans_method ENUM('withdraw', 'deposit'),
            trans_type ENUM('cash', 'online', 'Credit card') NOT NULL,
            amount INT CHECK (amount > 0),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(id)
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
