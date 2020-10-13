DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;
CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);
CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
use employees;
INSERT INTO department
    (name)
VALUES
    ('Operations'),
    ('Information Technology'),
    ('Marketing/Advertising'),
    ('Executive');
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('CEO', 1000000000, 4),
    ('VP Assistant', 500000, 4),
    ('General Manager', 250000, 1),
    ('Team Trainer', 100000, 1),
    ('Team Managing Analyst', 100000, 2),
    ('Team Analyst', 80000, 2),
    ('Media Manager', 60000, 3),
    ('Media Specialist', 30000, 3);
    
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Ariana', 'Grande', 1, NULL),
    ('Hilary', 'Duff', 2, 1),
    ('Sabrina', 'Carpenter', 3, NULL),
    ('Nicolas', 'Walsh', 4, 3),
    ('Hilary', 'Valencia', 5, NULL),
    ('Spongebob', 'Squarepants', 6, 5),
    ('Baby', 'Yoda', 7, NULL),
    ('The', 'Mandolorian', 8, 7);
    