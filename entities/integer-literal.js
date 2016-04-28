var IntegerLiteral, Type;

Type = require('./type');

IntegerLiteral = (function() {
    function IntegerLiteral(value) {
        this.value = value;
    }

    IntegerLiteral.prototype.toString = function() {
        return this.value.lexeme;
    };

    IntegerLiteral.prototype.analyze = function(context) {
        return this.type = Type.INT;
    };

    IntegerLiteral.prototype.optimize = function() {
        return this;
    };

    return IntegerLiteral;

})();

module.exports = IntegerLiteral;