var chalk = require('chalk');
var ListLiteral, Type;

Type = require('./type');

ListLiteral = (function() {
    function ListLiteral(items) {
        this.items = items;
    }

    ListLiteral.prototype.toString = function() {
        console.log(this.items)
        return "[" + this.items + "]";
    };

    ListLiteral.prototype.analyze = function() {
    	console.log(chalk.red("TODO: ListLiteral"));
    	return;
    }
    return ListLiteral;
})();

module.exports = ListLiteral;