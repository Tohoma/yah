var DictLiteral, Type;

Type = require('./type');

DictLiteral = (function() {
    function DictLiteral(items) {
        this.items = items;
    }

    DictLiteral.prototype.toString = function() {
        var bindArray = this.items.items;
        var result = [];
        for(var i = 0; i < bindArray.length; i += 1) {
            var bind = bindArray[i];
            result.push(bind.key.lexeme + ' : ' + bind.value);
        }
        return '{' + result.join(', ') + '}';
    };

    DictLiteral.prototype.analyze = function(context) {
        this.items.forEach(function(item) {
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