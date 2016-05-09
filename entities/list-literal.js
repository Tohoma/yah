var chalk = require('chalk');
var ListLiteral, Type;

Type = require('./type');

ListLiteral = (function() {
    function ListLiteral(items) {
        this.items = items;
    };

    ListLiteral.prototype.toString = function() {
        return "[" + this.items.join(', ') + "]";
    };

    ListLiteral.prototype.analyze = function(context) {
        // console.log(chalk.red("TODO: ListLiteral"));
        this.items.forEach(function(item) {
            item.analyze(context);
        });
        return this.type = Type.LIST;
    };

    ListLiteral.prototype.length = function() {
        return this.items.length;
    };

    ListLiteral.prototype.optimize = function() {
        this.items.forEach(function(item) {
            item.optimize();
        });
        return this;
    };

    return ListLiteral;
})();

module.exports = ListLiteral;