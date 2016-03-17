var NilLiteral, Type;

Type = require('./type');

NilLiteral = (function() {
    function NilLiteral(value) {
        this.value = value;
    }

    NilLiteral.prototype.toString = function() {
        return this.value.lexeme;
    };

    NilLiteral.prototype.analyze = function(context) {
        return this.type = Type.NIL;
    };

    return NilLiteral;

})();

module.exports = NilLiteral;