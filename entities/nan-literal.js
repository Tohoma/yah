var NaNLiteral, Type;

Type = require('./type');

NaNLiteral = (function() {
    function NaNLiteral(value) {
        this.value = value;
    }

    NaNLiteral.prototype.toString = function() {
        return this.value.lexeme;
    };

    NaNLiteral.prototype.analyze = function(context) {
        return this.type = Type.NAN;
    };

    return NaNLiteral;

})();

module.exports = NaNLiteral;