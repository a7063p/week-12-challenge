// THIS IS WHERE QUIRES GO //

const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    // ===============EMPLOYEE METHODS======================================//
    findAllEmployees() {
        return this.connection.promise().query(
        `SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name AS department, role.salary, CONCAT(e.first_name, " ", e.last_name) AS manager
        FROM employees
        INNER JOIN role ON (employees.role_id = role.id)
        INNER JOIN department ON role.department_id = department.id
        LEFT JOIN employees AS e ON employees.manager_id = e.id ORDER BY employees.id;`)
    };  

    allEmployees() {
        return this.connection.promise().query(
            `SELECT id, CONCAT(employees.first_name," ",employees.last_name) AS employee, manager_id AS manager
              FROM employees;`)
    }
    //======================================================================//


    // ==============DEPARTMENT METHODS====================================//

    findAllDepartments() {
        return this.connection.promise().query('SELECT id, name AS department FROM department;')
    };

    employeesByDepartment(id) {
        return this.connection.promise().query(
        `SELECT department.name AS department, CONCAT(employees.first_name, " ", employees.last_name) AS employee
        FROM employees
        INNER JOIN role ON (employees.role_id = role.id)
        INNER JOIN department ON role.department_id = department.id WHERE department.id=?;`, id)        
     };
    //  =====================================================================//

    // ============ROLES=====================================================//
    findAllRoles() {
        return this.connection.promise().query(
        `SELECT role.id, role.title AS role, department.name AS department, role.salary
        FROM role
        INNER JOIN department ON role.department_id=department.id ORDER BY role;`)
    };
    

    // =========================MANAGER METHODS =============================//
    findAllManagers() {
        return this.connection.promise().query(
        `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS manager 
        FROM employees 
        INNER JOIN employees AS e ON employees.manager_id = e.id GROUP BY manager;`
        )
    };

    employeesByManager(id) {
        return this.connection.promise().query(`
        SELECT CONCAT(e.first_name, " ", e.last_name) AS manager,CONCAT(employees.first_name, " ", employees.last_name) AS employee
        FROM employees
        INNER JOIN employees AS e on employees.manager_id=e.id WHERE e.id=?;`, id)        
     };
  

 
};

module.exports = new DB(connection);