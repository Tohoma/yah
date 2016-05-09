var TupleLiteral, Type;
var chalk = require('chalk');

Type = require('./type');

TupleLiteral = (function() {
    function TupleLiteral(expList) {
        this.expList = expList;
    }

    TupleLiteral.prototype.toString = function() {
        return "(" + this.expList.toString() + ")";
    };

    TupleLiteral.prototype.analyze = function(context) {
        this.expList.items.forEach(function(item) {
            item.analyze(context);
        });
        return this.type = Type.TUPLE;
    }

    TupleLiteral.prototype.length = function() {
        return this.items.length;
    }

    TupleLiteral.prototype.optimize = function() {
        items.optimize();
        return this;
    };

    return TupleLiteral;
})();

module.exports = TupleLiteral;