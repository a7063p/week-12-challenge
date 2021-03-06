const {prompt} = require('inquirer');
const db= require('./db');
const cTable = require('console.table');

function startApp () {
    prompt([
        {
            type: 'list',
            name: 'queryType',
            message: 'What would you like to do?',
            choices: [
               { 
                name: 'View all Employees',
                value: 'employeeAll'
               },
               {
                name: 'View All Employees By Department',
                value: 'departmentEmployees'
               },
               {
                name: 'View All Employees By Manager',
                value: 'managerEmployees'
               },
               {
                name: 'EXIT Employee Tracker',
                value: 'END'
               }
            ]
        }
    ])
    .then(({queryType}) => {
        switch (queryType) {
            case 'employeeAll':
            viewAllEmployees();
            break;

            case 'departmentEmployees':           
            viewAllDepartments();
            break;       

            case 'managerEmployees':           
            viewAllManagers();
            break;               
    
            default: 
                db.connection.end();
            break;       
        }
    });

}

// ALL Employees//
function viewAllEmployees() {
    db.findAllEmployees()
    .then(([data])=> {
        console.table(data);
        startApp()
    })
};

//  View Departments Employees//
function viewAllDepartments() {
    db.findAllDepartments()
    .then(([data]) => {
        prompt([
            {
                type: 'list',
                name: 'id',                
                choices: data.map(p => ({value: p.id, name: p.name}))
            }
        ])
        .then(({id}) => {
            db.employeesByDepartment(parseInt(id))
            .then(([data]) => {
                console.table(data);
                startApp()
            })
        })
    })
};

//View All Managers//
function viewAllManagers() {
    db.findAllManagers()
    .then(([data])=> {
        prompt([
            {
                type: 'list',
                name: 'id',
                choices: data.map(p => ({value: p.id, name: p.first_name}))
            }
        ])
        .then(({id}) => {
            db.employeeByManager(parseInt(id))
            .then(([data]) => {
                console.table(data);
                startApp()
            })
        })
    })
}


startApp()