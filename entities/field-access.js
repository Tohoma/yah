var chalk = require('chalk');
var FieldAccess;

FieldAccess = (function() {
    function FieldAccess(object, field) {
        this.object = object;
        this.field = field;
    }

    FieldAccess.prototype.toString = function() {
        return "(. " + this.object + " " + this.field + ")";
    };

    FieldAccess.prototype.analyze = function() {
    	console.log(chalk.red("TODO: FieldAccess"));
    	return;
    }

    return FieldAccess;

})();

module.exports = FieldAccess;