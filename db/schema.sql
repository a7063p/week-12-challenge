DROP DATABASE IF EXISTS personnel;
CREATE DATABASE personnel;

USE personnel;

CREATE TABLE `department` (
   `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `role` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(30) NOT NULL,
    `salary` DECIMAL NOT NULL,
    `department_id` INT,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`department_id`) REFERENCES `department`(`id`) ON DELETE CASCADE
);

CREATE TABLE `employees` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `role_id` INT,
    `manager_id` INT,
    PRIMARY KEY (`id`), 
    FOREIGN KEY(`role_id`) REFERENCES `role`(`id`) ON DELETE CASCADE,
	  FOREIGN KEY(`manager_id`) REFERENCES `employees`(`id`) ON DELETE SET NULL   
);

-- -- Manager
-- SELECT employees.id, employees.first_name, employees.last_name, CONCAT(e.first_name, " ", e.last_name) AS manager 
-- FROM employees
-- LEFT JOIN employees AS e on employees.manager_id=e.id;


-- -- Managers employee's
SELECT CONCAT(e.first_name, " ", e.last_name) AS manager,CONCAT(employees.first_name, " ", employees.last_name) AS employee
FROM employees
INNER JOIN employees AS e on employees.manager_id=e.id;


-- manager list
SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS manager 
FROM employees 
INNER JOIN employees AS e ON employees.manager_id = e.id GROUP BY manager;




