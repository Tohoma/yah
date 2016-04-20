var TupleLiteral, Type;

Type = require('./type');

TupleLiteral = (function() {
    function TupleLiteral(items) {
        this.items = items;
    }

    TupleLiteral.prototype.toString = function() {
        return "(" + this.items + ")";
    };
    return TupleLiteral;
})();

module.exports = TupleLiteral;