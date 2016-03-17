var FloatLiteral, Type;

Type = require('./type');

FloatLiteral = (function() {
    function FloatLiteral(value) {
        this.value = value;
    }

    FloatLiteral.prototype.toString = function() {
        return this.value.lexeme;
    };

    FloatLiteral.prototype.analyze = function(context) {
        return this.type = Type.FLOAT;
    };

    FloatLiteral.prototype.optimize = function() {
        return this;
    };

    return FloatLiteral;

})();

module.exports = FloatLiteral;