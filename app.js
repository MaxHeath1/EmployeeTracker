const inquirer = require('inquirer');
const mysql = require('mysql2');

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
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        break;
      default:
        console.log(`Invalid action: ${answers.action}`);
        initApp();
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

function viewRoles() {
  const query = `SELECT role.id, role.title, department.name AS department, role.salary 
                 FROM role 
                 INNER JOIN department ON role.department_id = department.id`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initApp();
  });
}

function viewEmployees() {
  const query = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
                 CONCAT(m.first_name, ' ', m.last_name) AS manager 
                 FROM employee e 
                 LEFT JOIN employee m ON e.manager_id = m.id 
                 INNER JOIN role ON e.role_id = role.id 
                 INNER JOIN department ON role.department_id = department.id`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initApp();
  });
}

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

// Function to add a role
function addRole() {
  connection.query('SELECT * FROM department', (err, departments) => {
    if (err) throw err;
    inquirer.prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'What is the title of the role?'
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'departmentId',
        choices: departments.map(dept => ({name: dept.name, value: dept.id})),
        message: 'Which department does the role belong to?'
      }
    ])
    .then(answer => {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      connection.query(query, [answer.roleTitle, answer.roleSalary, answer.departmentId], (err, res) => {
        if (err) throw err;
        console.log('Role added!');
        initApp();
      });
    });
  });
}


// Function to add an employee
function addEmployee() {
  connection.query('SELECT * FROM role', (err, roles) => {
    if (err) throw err;
    connection.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'What is the first name of the employee?'
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'What is the last name of the employee?'
        },
        {
          type: 'list',
          name: 'roleId',
          choices: roles.map(role => ({name: role.title, value: role.id})),
          message: 'What is the role of the employee?'
        },
        {
          type: 'list',
          name: 'managerId',
          choices: [{ name: 'None', value: null }].concat(employees.map(emp => ({name: `${emp.first_name} ${emp.last_name}`, value: emp.id}))),
          message: 'Who is the manager of the employee?'
        }
      ])
      .then(answer => {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        connection.query(query, [answer.firstName, answer.lastName, answer.roleId, answer.managerId], (err, res) => {
          if (err) throw err;
          console.log('Employee added!');
          initApp();
        });
      });
    });
  });
}


// Function to update an employee role
function updateEmployeeRole() {
  connection.query('SELECT * FROM employee', (err, employees) => {
    if (err) throw err;
    connection.query('SELECT * FROM role', (err, roles) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          choices: employees.map(emp => ({name: `${emp.first_name} ${emp.last_name}`, value: emp.id})),
          message: 'Which employee\'s role do you want to update?'
        },
        {
          type: 'list',
          name: 'roleId',
          choices: roles.map(role => ({name: role.title, value: role.id})),
          message: 'What is the new role of the employee?'
        }
      ])
      .then(answer => {
        const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
        connection.query(query, [answer.roleId, answer.employeeId], (err, res) => {
          if (err) throw err;
          console.log('Employee role updated!');
          initApp();
        });
      });
    });
  });
}