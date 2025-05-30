# Create Database Query
        CREATE TABLE users(
            userId INTEGER PRIMARY KEY AUTO INCREMENT,
            userEmail VARCHAR(60) NOT NULL UNIQUE,
            password VARCHAR(400) NOT NULL
        )  

# Insert into users table
        INSERT INTO users(userEmail, password) VALUES $1;