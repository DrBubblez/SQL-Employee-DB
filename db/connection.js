// Importing Dependencies
const mysql = require('mysql2/promise');
require('dotenv').config();

// Declaring global variable
let db;

// Function to connect to database
async function connectDB() {
  try {
    const dbConfig = { // Database configuration
        host: '127.0.0.1', 
        user: process.env.DB_USER, // Your username imported from .env
        password: process.env.DB_PASSWORD, // Your password imported from .env
        database: process.env.DB_NAME // Your database name imported from .env
    };
    
    // Create a new connection using the config details
    db = await mysql.createConnection(dbConfig);
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Exporting the connection and a function to get the database
module.exports = { connectDB, getDb: () => db };