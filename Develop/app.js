const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const allEmployees = [];

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

const newManagerQ = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is the new Manager's office number?"
    }
];

const newEngineerQ = [
    {
        type: "input",
        name: "github",
        message: "What is the new Engineer's GitHub username?"
    }
];

const newInternQ = [
    {
        type: "input",
        name: "school",
        message: "What is the new Intern's school name?"
    }
];

const addEmployee = [
    {
        type: "list",
        name: "addEmployee",
        message: "Would you like to add a new employee?",
        choices: ["Yes", "No"]
    }
]

init();

function init() {
    inquirer.prompt(addEmployee).then(function (data) {
        if (data.addEmployee === "Yes") {
            newEmployee();
        } else {
            writeToFile(outputPath, render(allEmployees));
        }
    });
}

function newEmployee() {
    inquirer.prompt(newEmployeeQs).then(function (data) {
        if (data.role === "Manager") {
            // let manager = new Manager(data.employeeName, data.id, data.email);
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
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
