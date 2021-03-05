// THIS IS WHERE QUIRES GO //

const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }


    findAllEmployees() {
        return this.connection.promise().query('SELECT id, first_name, last_name FROM employees;')
    }
    findEmployeeById(id) {
        return this.connection.promise().query('SELECT id, first_name, last_name FROM employees WHERE id=?;', id);
    }
};

module.exports = new DB(connection);