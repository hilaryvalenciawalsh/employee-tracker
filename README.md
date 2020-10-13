[contributors-shield]: https://img.shields.io/github/contributors/hilaryvalenciawalsh/se-team-generator.svg?style=flat-square
[contributors-url]: https://github.com/hilaryvalenciawalsh/se-team-generator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/hilaryvalenciawalsh/se-team-generator.svg?style=flat-square
[forks-url]: https://github.com/hilaryvalenciawalsh/se-team-generator/network/members
[stars-shield]: https://img.shields.io/github/stars/hilaryvalenciawalsh/se-team-generator.svg?style=flat-square
[stars-url]: https://github.com/hilaryvalenciawalsh/se-team-generator/stargazers
[issues-shield]: https://img.shields.io/github/issues/hilaryvalenciawalsh/se-team-generator.svg?style=flat-square
[issues-url]: https://github.com/hilaryvalenciawalsh/se-team-generator/issues
[license-shield]: https://img.shields.io/github/license/hilaryvalenciawalsh/se-team-generator.svg?style=flat-square
[license-url]: https://github.com/hilaryvalenciawalsh/se-team-generator/blob/master/license.txt
[![Contributors][contributors-shield]][contributors-url] [![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url] [![Issues][issues-shield]][issues-url] [![license.txt][license-shield]][license-url]

# employee-tracker

## Description 
**Department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **Role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **Employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  
This command-line application allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

## Installation
Use "npm install inquirer", and "npm install mysql". This connects you yo inquirer, and mySQL. We also use "npm init" to create the JSON file from our package. Finally, "npm console.table" formats our tables. 

## Run
Use "node index.js"

## Screenshot
<img width="537" alt="Screen Shot 2020-10-12 at 9 29 57 PM" src="https://user-images.githubusercontent.com/67081309/95815707-1f233a80-0cd2-11eb-8781-96634556092e.png">

## Questions
Please contact me using one of the following:

- Github: [hilaryvalenciawalsh](https://gist.github.com/hilaryvalenciawalsh)  [<img src="https://avatars1.githubusercontent.com/u/67081309?v=4" height="50" width="50" alt="hilaryvalenciawalsh"/>](https://gist.github.com/hilaryvalenciawalsh) 

- Email: hilaryvalenciawalsh@gmail.com;