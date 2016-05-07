var ListLiteral, Type;

Type = require('./type');

ListLiteral = (function() {
    function ListLiteral(items) {
        this.items = items;
    }

    ListLiteral.prototype.toString = function() {
        return "[" + this.items + "]";
    };

    ListLiteral.prototype.analyze = function(context) {
        items.analyze(context);
        return this.type = Type.LIST;
    }

    ListLiteral.prototype.optimize = function() {
        items.optimize();
        return this;
    }
    return ListLiteral;
})();

module.exports = ListLiteral;