"use strict";

const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const promptMessages = {
  viewAllEmployees: "View All Employees",
  viewByDepartment: "View All Employees By Department",
  viewByManager: "View All Employees By Manager",
  updateRole: "Update Employee Role",
  viewAllRoles: "View All Roles",
  addEmployee: "Add An Employee",
  removeEmployee: "Remove An Employee",
  updateEmployeeManager: "Update Employee Manager",

  exit: "Exit",
};

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees",
});

connection.connect((err) => {
  if (err) throw err;
  prompt();
});

function prompt() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Here are a list of options to choose from:",
      choices: [
        promptMessages.viewAllEmployees,
        promptMessages.viewByDepartment,
        promptMessages.viewByManager,
        promptMessages.viewAllRoles,
        promptMessages.updateRole,
        promptMessages.addEmployee,
        promptMessages.removeEmployee,
        promptMessages.exit,
      ],
    })
    .then((answer) => {
      console.log("answer", answer);
      switch (answer.action) {
        case promptMessages.viewAllEmployees:
          viewAllEmployees();
          break;

        case promptMessages.viewByDepartment:
          viewByDepartment();
          break;

        case promptMessages.viewByManager:
          viewByManager();
          break;

        case promptMessages.updateRole:
          remove("role");
          break;

        case promptMessages.viewAllRoles:
          viewAllRoles();
          break;

        case promptMessages.addEmployee:
          addEmployee();
          break;

        case promptMessages.removeEmployee:
          remove("delete");
          break;

        case promptMessages.exit:
          connection.end();
          break;
      }
    });
}
function viewAllEmployees() {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.log("CLICK HERE TO VIEW ALL EMPLOYEES");
    console.log("\n");
    console.table(res);
    prompt();
  });
}
function viewByDepartment() {
  const query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.log("CLICK HERE TO VIEW EMPLOYEES BY DEPT");
    console.log("\n");
    console.table(res);
    prompt();
  });
}
function viewByManager() {
  const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY manager;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.log("CLICK HERE TO VIEW EMPLOYEES BY MANAGER");
    console.log("\n");
    console.table(res);
    prompt();
  });
}
async function updateRole() {
  const employeeId = await inquirer.prompt(askId());

  connection.query(
    "SELECT role.id, role.title FROM role ORDER BY role.id;",
    async (err, res) => {
      if (err) throw err;
      const { role } = await inquirer.prompt([
        {
          name: "role",
          type: "list",
          choices: () => res.map((res) => res.title),
          message: "CLICK HERE TO UPDATE EMPLOYEES ROLE",
        },
      ]);
      let roleId;
      for (const row of res) {
        if (row.title === role) {
          roleId = row.id;
          continue;
        }
      }
      connection.query(
        `UPDATE employee 
        SET role_id = ${roleId}
        WHERE employee.id = ${employeeId.name}`,
        async (err, res) => {
          if (err) throw err;
          console.log("This persons role is now updated! :)");
          prompt();
        }
      );
    }
  );
}
function viewAllRoles() {
  const query = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.log("CLICK HERE TO VIEW EMPLOYEE BY ROLE");
    console.log("\n");
    console.table(res);
    prompt();
  });
}

async function addEmployee() {
    const addname = await inquirer.prompt(askName());
    connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
        if (err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'Input the employees role: '
            }
        ]);
        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        connection.query('SELECT * FROM employee', async (err, res) => {
            if (err) throw err;
            let choices = res.map(res => `${res.first_name} ${res.last_name}`);
            choices.push('none');
            let { manager } = await inquirer.prompt([
                {
                    name: 'manager',
                    type: 'list',
                    choices: choices,
                    message: 'Choose this employees Manager: '
                }
            ]);
            let managerId;
            let managerName;
            if (manager === 'none') {
                managerId = null;
            } else {
                for (const data of res) {
                    data.fullName = `${data.first_name} ${data.last_name}`;
                    if (data.fullName === manager) {
                        managerId = data.id;
                        managerName = data.fullName;
                        console.log(managerId);
                        console.log(managerName);
                        continue;
                    }
                }
            }
            console.log('This person has been added.');
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: addname.first,
                    last_name: addname.last,
                    role_id: roleId,
                    manager_id: parseInt(managerId)
                },
                (err, res) => {
                    if (err) throw err;
                    prompt();

                }
            );
        });
    });

}
function remove(input) {
    const promptQ = {
        yes: "yes",
        no: "no (view all employees)"
    };
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "A employee ID need to be entered. View all employees to get" +
                " the employee ID. Do you know the employee ID?",
            choices: [promptQ.yes, promptQ.no]
        }
    ]).then(answer => {
        if (input === 'delete' && answer.action === "yes") removeEmployee();
        else if (input === 'role' && answer.action === "yes") updateRole();
        else viewAllEmployees();



    });
};

async function removeEmployee() {

    const answer = await inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "Input the employees ID number to remove:  "
        }
    ]);

    connection.query('DELETE FROM employee WHERE ?',
        {
            id: answer.first
        },
        function (err) {
            if (err) throw err;
        }
    )
    console.log('This person has been removed :(');
    prompt();

};

function askId() {
    return ([
        {
            name: "name",
            type: "input",
            message: "INPUT EMPLOYEE ID HERE:  "
        }
    ]);
}