// MAKE CONNECTION TO MYSQL DATABASE //

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'personnel'
});


// This Error fires after getting a connection //

connection.connect(function(err) {
    if(err) {
        throw err;
    }
});

module.exports = connection;