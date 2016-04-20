var ListLiteral, Type;

Type = require('./type');

ListLiteral = (function() {
    function ListLiteral(items) {
        this.items = items;
    }

    ListLiteral.prototype.toString = function() {
        return "[" + this.items + "]";
    };
    return ListLiteral;
})();

module.exports = ListLiteral;