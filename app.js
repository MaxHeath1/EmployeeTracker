const inquirer = require('inquirer');
const mysql = require('mysql1');

// Create a connection to your MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Meeks',
  database: 'department'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
  initApp();
});
function initApp() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ])
    .then(answers => {
      switch (answers.action) {
        case 'View all departments':
          viewDepartments();
          break;
        // Add cases for each option...
        case 'Exit':
          connection.end();
          break;
      }
    });
  }
  function viewDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      initApp();
    });
  }
  
  // Define similar functions for viewRoles, viewEmployees, etc.
  
  function addDepartment() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'deptName',
        message: 'What is the name of the department?'
      }
    ])
    .then(answer => {
      const query = 'INSERT INTO department (name) VALUES (?)';
      connection.query(query, answer.deptName, (err, res) => {
        if (err) throw err;
        console.log('Department added!');
        initApp();
      });
    });
  }
  
  // Define similar functions for addRole, addEmployee, etc.
  