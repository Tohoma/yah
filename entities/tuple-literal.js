var TupleLiteral, Type;

Type = require('./type');

TupleLiteral = (function() {
    function TupleLiteral(items) {
        this.items = items;
    }

    TupleLiteral.prototype.toString = function() {
        return "(" + this.items + ")";
    };

    TupleLiteral.prototype.analyze = function(context) {
        items.analyze(context);
        return this.type = Type.TUPLE;
    };

    TupleLiteral.prototype.optimize = function() {
        items.optimize();
        return this;
    };

    return TupleLiteral;
})();

module.exports = TupleLiteral;