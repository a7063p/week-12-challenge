-- SCHEMA - DEPARTMENT -> ROLES -> EMPLOYEES--
INSERT INTO `department` (name) 
VALUES
('Sales'),
('Finances'),
('legal'),
('engineering');

INSERT INTO `role` (title, salary, department_id) 
VALUES
('Sales lead', 100000.00, 1),
('Sales Person', 85000.00, 1),
('Lead Engineer', 150000.00, 4),
('Software Engineer', 120000.00, 4),
('Accountant', 125000.00, 2),
('Legal Team Lead', 250000.00, 3),
('Lawyer', 190000.00, 3);


INSERT INTO `employees` (first_name, last_name, role_id)
VALUES
('Tom', 'Haskins', 1),
('George', 'Washington', 2),
('Thomas', 'Jefferson', 3),
('Abe', 'Lincoln', 4),
('Teddy', 'Roosevelt', 5),
('Harry', 'Truman', 6),
('John', 'Adams', 7),
('James', 'Madison', 1),
('James', 'Monroe', 2),
('Andrew', 'Jackson', 3);


INSERT INTO `employees` (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 4,2),
('Mike', 'Chan', 5,8),
('Ashley','Rodriguez', 6,null),
('Mark', 'Cruz', 7,1),
('Ted', 'Carrasco',1,1),
('Kevin','Tupik',2,7),
('Malia','Brown',3,8),
('Sarah', 'Lourd',4,3),
('Tom', 'Allen', 5,5),
('Tammer', 'Galal',6,4);


