DROP DATABASE IF EXISTS personnel;
CREATE DATABASE personnel;

USE personnel;

CREATE TABLE employees (
    id INT (10) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);




