const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Empty array to hold employees
const allEmployees = [];

// questions for all new employees
const newEmployeeQs = [
    {
        type: "list",
        name: "role",
        message: "What is the new employee's role?",
        choices: ["Manager", "Engineer", "Intern"]

    }, {
        type: "input",
        name: "employeeName",
        message: "What is the new employee's name?"
    }, {
        type: "input",
        name: "id",
        message: "What is the new employee's id?"
    }, {
        type: "input",
        name: "email",
        message: "What is the new employee's email?"
    }
];

// question if manager role was selected
const newManagerQ = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is the new Manager's office number?"
    }
];

// question if engineer role was selected
const newEngineerQ = [
    {
        type: "input",
        name: "github",
        message: "What is the new Engineer's GitHub username?"
    }
];

// question if intern role was selected
const newInternQ = [
    {
        type: "input",
        name: "school",
        message: "What is the new Intern's school name?"
    }
];

// question to initialize later questions
const addEmployee = [
    {
        type: "list",
        name: "addEmployee",
        message: "Would you like to add a new employee?",
        choices: ["Yes", "No"]
    }
]

// initializes question asking
init();

// initial function asking addEmployee question 
function init() {
    inquirer.prompt(addEmployee).then(function (data) {
        if (data.addEmployee === "Yes") {
            newEmployee();
        } else {
            writeToFile(outputPath, render(allEmployees));
        }
    });
}

// function that asks the rest of the questions and sorts employees by role
function newEmployee() {
    inquirer.prompt(newEmployeeQs).then(function (data) {
        if (data.role === "Manager") {
            inquirer.prompt(newManagerQ).then(function (officeNumber) {
                let manager = new Manager(data.employeeName, data.id, data.email, officeNumber.officeNumber);
                allEmployees.push(manager);
                init();
            });
        }
        if (data.role === "Engineer") {
            inquirer.prompt(newEngineerQ).then(function (github) {
                let engineer = new Engineer(data.employeeName, data.id, data.email, github.github);
                allEmployees.push(engineer);
                init();
            });
        }
        if (data.role === "Intern") {
            inquirer.prompt(newInternQ).then(function (school) {
                let intern = new Intern(data.employeeName, data.id, data.email, school.school);
                allEmployees.push(intern);
                init();
            });
        }
    });
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success! Your team.html has been created!");
    });
}