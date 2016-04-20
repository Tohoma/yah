var StringLiteral, Type;

Type = require('./type');

StringLiteral = (function() {
    function StringLiteral(value) {
        this.value = value;
    }

    StringLiteral.prototype.toString = function() {
        return this.value.lexeme;
    };

    StringLiteral.prototype.analyze = function(context) {
        return this.type = Type.STR;
    };

    StringLiteral.prototype.optimize = function() {
        return this;
    };

    return StringLiteral;

})();

module.exports = StringLiteral;