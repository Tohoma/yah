var UndefinedLiteral, Type;

Type = require('./type');

UndefinedLiteral = (function() {
    function UndefinedLiteral(value) {
        this.value = value;
    }

    UndefinedLiteral.prototype.toString = function() {
        return this.value.lexeme;
    };

    UndefinedLiteral.prototype.analyze = function(context) {
        return this.type = Type.UNDEFINED;
    };

    return UndefinedLiteral;

})();

module.exports = UndefinedLiteral;