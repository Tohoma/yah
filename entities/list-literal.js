var ListLiteral, Type;

Type = require('./type');

ListLiteral = (function() {
    function ListLiteral(items) {
        this.items = items;
    }

    ListLiteral.prototype.toString = function() {
        return "[" + this.items + "]";
    };

    ListLiteral.prototype.analyze = function() {
    	console.log("TODO: ListLiteral")
    	return;
    }
    return ListLiteral;
})();

module.exports = ListLiteral;