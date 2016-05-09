var DictLiteral, Type;

Type = require('./type');

DictLiteral = (function() {
    function DictLiteral(bindList) {
        this.bindList = bindList;
    }

    DictLiteral.prototype.toString = function() {
        return "{" + this.bindList.toString() + "}";
    };

    DictLiteral.prototype.analyze = function(context) {
        this.bindList.items.forEach(function(item) {
            item.analyze(context);
        });
        return this.type = Type.DICT;
    }

    DictLiteral.prototype.length = function() {
        return this.items.length;
    }

    DictLiteral.prototype.optimize = function() {
        this.items.optimize();
        return this;
    }

    return DictLiteral;
})();

module.exports = DictLiteral;