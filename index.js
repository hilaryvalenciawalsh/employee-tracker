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
