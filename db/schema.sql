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


