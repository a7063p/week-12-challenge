const {prompt} = require('inquirer');
const db= require('./db');
const cTable = require('console.table');
const inquirer = require('inquirer');
const { connection, employeesByManager } = require('./db');

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
                name: 'View all Departments',
                value: 'departmentAll'
               },
               { 
                name: 'View all Roles',
                value: 'roleAll'
               },
               {
                name: 'View all Employees By Department',
                value: 'departmentEmployees'
               },
               {
                name: 'View all Employees By Manager',
                value: 'managerEmployees'
               },
               {
                name: 'Add a Department',
                value: 'addDepartment'
               },
               {
                name: 'Add a Role',
                value: 'addRole'
               },
               {
                name: 'Add Employee',
                value: 'addEmployee'
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

            case 'departmentAll':           
            viewAllDepartments();
            break;     

            case 'roleAll':           
            viewAllRoles();
            break;       

            case 'departmentEmployees':           
            getAllDepartments();
            break;       

            case 'managerEmployees':           
            getAllManagers();
            break;  

            case 'addDepartment':           
            addDepartment();
            break; 

            case 'addRole':           
            addRole();
            break;     

            case 'addEmployee':           
            addEmployee();
            break;               
    
            default: 
                db.connection.end();
            break;       
        }
    });

}

// ========EMPLOYEES========//
function viewAllEmployees() {
    db.findAllEmployees()
    .then(([data])=> {
        console.table(data);
        startApp()
    })
};

function addEmployee() {
    db.findAllRoles()        
    .then(([data]) => {        
        prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Please enter new Employee\'s First Name (required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('A First Name is required.')
                    }
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please enter new Employee\'s Last Name (required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('A Last Name is required.')
                    }
                }       
            },
            {
                type: 'list',
                name: 'id',
                message: 'Please select Employees role',
                choices: data.map(p=> ({value: p.id, name: p.role}))
            },
           
        ])                 
            .then(function (data) {
            connection.query('INSERT INTO employees SET ?',
            {
                first_name: data.first_name,
                last_name: data.last_name,
                role_id: data.id,
                manager_id: 1
            },
            function() {
                console.log(`
                ==========================================================
                Employee ${data.first_name} ${data.last_name} was Successfully Created
                =========================================================`);
               
            })
           
        })     
    })   
};


//  =======DEPARTMENT=========//

function viewAllDepartments(){
    db.findAllDepartments()
    .then(([data]) => {
        console.table(data)
        startApp()
    })
}

function addDepartment() {
    prompt([
        {
            type: 'input',
            name: 'newDeptName',
            message: 'Please Enter New Department Name (required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ('A Department Name is required.')
                }
            }
        }
    ])
    .then( function (data) {
        connection.query('INSERT INTO department SET ?',
        {
            name: data.newDeptName
        },
         function() {
            console.log(`
            ============================================
            Department ${data.newDeptName} Successfully Created
            ============================================`);
            startApp();
        })
    })    
}

function getAllDepartments() {
    db.findAllDepartments()
    .then(([data]) => {
        prompt([
            {
                type: 'list',
                name: 'id', 
                message: 'Select Department',              
                choices: data.map(p => ({value: p.id, name: p.department}))
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

// ========ROLES===========//
function viewAllRoles(){
    db.findAllRoles()
    .then(([data]) => {
        console.table(data)
        startApp()
    })
};

function addRole() {
    db.findAllDepartments()
    .then(([data]) => {
        prompt ([
            
            {
                type: 'input',
                name: 'newRoleTitle',
                message: 'Enter a new Role Title (required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('A Role Title is required.')
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                Message: 'Enter a salary amount (required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('A salary is required.')
                    }
                }
            },
            {
                type: 'list',
                name: 'id',
                message: "Select a Department to assign Role",
                choices: data.map(p => ({value: p.id, name: p.department}))
            }
        ])
        .then( function (data) {
            connection.query('INSERT INTO role SET ?',
            {
                title: data.newRoleTitle,
                salary: data.salary,
                department_id: data.id
            },
             function() {
                console.log(`
                ============================================
                Role ${data.newRoleTitle} Successfully Created
                ============================================`);
                startApp();
            })
        })
    })
};



// =========MANGER==========//
function getAllManagers() {
    db.findAllManagers()
    .then(([data])=> {
        prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Select Manager',
                choices: data.map(p => ({value: p.id, name: p.manager}))  
            }
        ])
        .then(({id}) => {
            db.employeesByManager(parseInt(id))
            .then(([data]) => {
                console.table(data);
                startApp()
            })
        })
    })
};




startApp()