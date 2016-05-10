var chalk = require('chalk');
var ListLiteral, Type;

Type = require('./type');

ListLiteral = (function() {
    function ListLiteral(expList) {
        this.expList = expList;
    };

    ListLiteral.prototype.toString = function() {
        return "[" + this.expList.toString() + "]";
    };

    ListLiteral.prototype.analyze = function(context) {
        // console.log(chalk.red("TODO: ListLiteral"));
        this.expList.items.forEach(function(item) {
            item.analyze(context);
        });
        return this.type = Type.LIST;
    };

    ListLiteral.prototype.length = function() {
        return this.expList.items.length;
    };

    ListLiteral.prototype.optimize = function() {
        this.expList.items.forEach(function(item) {
            item.optimize();
        });
        return this;
    };

    return ListLiteral;
})();

module.exports = ListLiteral;