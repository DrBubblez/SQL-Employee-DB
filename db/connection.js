const mysql = require('mysql2/promise');
require('dotenv').config();

async function connectDB() {
  try {
    const dbConfig = {
        host: '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    };
    
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to the database.");
    return connection;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { connectDB };