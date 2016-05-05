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
    	console.log("TODO: TupleLiteral")
    	return this.type = Type.TUPLE;
    }

    TupleLiteral.prototype.length = function() {
    	return this.items.length;
    }
    return TupleLiteral;
})();

module.exports = TupleLiteral;