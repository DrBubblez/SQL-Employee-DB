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

// View Departments Function
const viewDepartments = async () => {
    try { // Try to query database for all departments
        const [departments] = await getDb().query('SELECT * FROM department');
        console.table(departments);
    } catch (error) { // Catch and display any errors
        console.error('Error fetching departments:', error);
    }
    mainMenu(); // Return to main menu
};

// View Roles Function
const viewRoles = async () => {
    try { // Try to query database for all roles
        const [roles] = await getDb().query('SELECT * FROM role');
        console.table(roles);
    } catch (error) { // Catch and display any errors
        console.error('Error fetching roles:', error);
    }
    mainMenu(); // Return to main menu
};

// Add Employee Function
// Establishing pre-set manager IDs but allowing for more to be added
let managerIDs = [1, 3, 5, 6, 8, 10, 12, 14, 16, 17];
const addEmployee = async () => {
    try { // Try to query database for all roles
        const [roles] = await getDb().query('SELECT * FROM role');
        const roleChoices = roles.map(({ id, title }) => ({ name: title, value: id }));
        const { firstName, lastName, roleId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employee\'s first name?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employee\'s last name?'
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'What is the employee\'s role?',
                choices: roleChoices
            }
        ]);

        // Query database for employees with a manager ID
        const [managers] = await getDb().query('SELECT id, CONCAT(first_name, " ", last_name) AS fullname FROM employee WHERE role_id IN (?)', [managerIDs]);
        const managerChoices = managers.map(({ id, fullname }) => ({ name: fullname, value: id }));
        managerChoices.push({ name: 'No Manager', value: null });

        // Get manager ID from user
        const { managerId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'managerId',
                message: 'Who is the employee\'s manager?',
                choices: managerChoices
            }
        ]);

        // Add employee to database
        await getDb().query('INSERT INTO employee SET ?', { first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId });
        console.log('Employee added successfully!');
    } catch (error) { // Catch and display any errors
        console.error('Error adding employee:', error);
    }
    mainMenu(); // Return to main menu
};

// Add Department Function
const addDepartment = async () => {
    try { // Try to query database for all departments
        const { departmentName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department?'
            }
        ]);
        // Add department to database
        await getDb().query('INSERT INTO department SET ?', { name: departmentName });
        console.log('Department added successfully!');
    } catch (error) { // Catch and display any errors
        console.error('Error adding department:', error);
    }
    mainMenu(); // Return to main menu
};

// Add Role Function
const addRole = async () => {
    try { // Try to query database for all departments
        const [departments] = await getDb().query('SELECT * FROM department');
        const departmentChoices = departments.map(({ id, name }) => ({ name: name, value: id }));
        const { roleName, roleSalary, departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'What department does the role belong to?',
                choices: departmentChoices
            }
        ])
        // Add role to database
        await getDb().query('INSERT INTO role SET ?', { title: roleName, salary: roleSalary, department_id: departmentId});
        console.log('Role added successfully!');
    } catch (error) { // Catch and display any errors
        console.error('Error adding role:', error);
    }
    // ask if role is a manager role
    const { isManager } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'isManager',
            message: 'Is this role a manager role?'
        }
    ])
    if (isManager) { // If role is a manager role, it is added to the managerIDs array for use in the addEmployee function
        const [[result]] = await getDb().query('SELECT LAST_INSERT_ID() as id');
        managerIDs.push(result.id);
    }    
    mainMenu(); // Return to main menu
};

// Update Employee Role Function
const updateEmployeeRole = async () => {
    try { // Try to query database for all employees
        const [employees] = await getDb().query('SELECT * FROM employee');
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
        const [roles] = await getDb().query('SELECT * FROM role');
        const roleChoices = roles.map(({ id, title }) => ({ name: title, value: id }));
        const { employee, role } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to update?',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the employee\'s new role?',
                choices: roleChoices
            }
        ]);
    
        const [[employeeRole]] = await getDb().query('SELECT role_id FROM employee WHERE id = ?', [employee]);

        // if the old role of the employee was a manager role, and the new role isn't a manager role
        if (managerIDs.includes(employeeRole.role_id) && !managerIDs.includes(role)) {
            const index = managerIDs.indexOf(employeeRole.role_id);
            managerIDs.splice(index, 1);
        }

        // if the new role is a manager role and the old role wasn't
        if (!managerIDs.includes(employeeRole.role_id) && managerIDs.includes(role)) {
            managerIDs.push(role);
        }

        // Update employee role in database
        await getDb().query('UPDATE employee SET role_id = ? WHERE id = ?', [role, employee]);
        console.log('Employee role updated successfully!');
    } catch (error) { // Catch and display any errors
        console.error('Error updating employee role:', error);
    }
    mainMenu(); // Return to main menu
};


mainMenu();

// Listen for server connection
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});