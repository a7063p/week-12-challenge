const {prompt} = require('inquirer');
const db= require('./db');

function startApp () {
    prompt([
        {
            type: 'list',
            name: 'queryType',
            message: 'What would you like to select?',
            choices: [
               { 
                name: 'Select All',
                value: 'ALL'
               },
               {
                name: 'Select by ID',
                value: 'BY_ID'
               },
               {
                name: 'Stop',
                value: 'END'
               }
            ]
        }
    ])
    .then(({queryType}) => {
        switch (queryType) {
            case 'BY_ID': 
            selectOne();
            break;
    
            case 'ALL':
            selectAll();
            break;
    
            default: 
                db.connection.end();
            break;       
        }
    });

}


function selectAll() {
    db.findAllEmployees()
    .then(([data])=> {
        console.table(data);
        startApp()
    })
}


///////////////////////////////////////
function selectOne() {
    db.findAllEmployees()
    .then(([employees]) => {
        prompt([
            {
                type: 'list',
                name: 'id',
                choices: employees.map(p => p.id)
                //choices: data.map(p => ({value: p.id, first_name: p.first_name}))
            }
        ])
        .then(({id}) => {
            db.findEmployeeById(parseInt(id))
            .then(([data]) => {
                console.table(data);
                startApp()
            })
        })
    })
}


startApp()