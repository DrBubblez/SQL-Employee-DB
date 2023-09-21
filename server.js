// Importing dependencies
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Setting up port and express app
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Importing database connection
const { connectDB, getDb } = require('./db/connection');

// Connect to database
connectDB();

// Main Menu Function
const mainMenu = async () => {
    const { choice } = await inquirer.prompt([ // Prompt user for choice
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
                'Exit'
            ]
        }
    ])
    switch (choice) { // Switch statement to handle user choice
        case 'View Employees':
            viewEmployees();
            break;
        case 'View Departments':
            viewDepartments();
            break;
        case 'View Roles':
            viewRoles();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'Exit':
            db.end();
            break;
    }
}

// View Employees Function
const viewEmployees = async () => {
    try { // Try to query database for all employees
      const [employees] = await getDb().query('SELECT * FROM employee');
      console.table(employees);
    } catch (error) { // Catch and display any errors
      console.error('Error fetching employees:', error);
    }
    mainMenu(); // Return to main menu
};

mainMenu();

// Listen for server connection
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});