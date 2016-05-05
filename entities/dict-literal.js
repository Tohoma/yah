var DictLiteral, Type;

Type = require('./type');

DictLiteral = (function() {
    function DictLiteral(items) {
        this.items = items;
    }

    DictLiteral.prototype.toString = function() {
        return "{" + this.items + "}";
    };

    DictLiteral.prototype.analyze = function(context) {
        this.items.forEach(function(item) { item.analyze(context); });
        return this.type = Type.DICT;
    }

    DictLiteral.prototype.length = function() {
        return this.items.length;
    }
    return DictLiteral;
})();

module.exports = DictLiteral;