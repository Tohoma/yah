var DictLiteral, Type;

Type = require('./type');

DictLiteral = (function() {
    function DictLiteral(items) {
        this.items = items;
    }

    DictLiteral.prototype.toString = function() {
        return "{" + this.items + "}";
    };

    return DictLiteral;
})();

module.exports = DictLiteral;