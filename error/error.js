var chalk = require('chalk');
var error = function(message, location) {
    if (location && location.line) {
        message += " at line " + location.line;
        if (location.col) {
            message += ", column " + location.col;
        }
    }
    if (error.quiet) {
        console.log(chalk.red(("Error: " + message)));
    }
    return error.count++;
};

error.quiet = false;
error.count = 0;


module.exports = error;