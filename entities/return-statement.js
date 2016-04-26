var ReturnStatement;
var chalk = require('chalk');

ReturnStatement = (function() {
    function ReturnStatement(exp) {
        this.exp = exp;
    }

    ReturnStatement.prototype.toString = function() {
        return "(Return " + this.exp + ")";
    };

    ReturnStatement.prototype.analyze = function(context) {
    	console.log(chalk.red("Return Statment Analyzer todo"))
    	return
    }

    return ReturnStatement;
})();

module.exports = ReturnStatement;