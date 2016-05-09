var BooleanLiteral, Type;

Type = require('./type');

BooleanLiteral = (function() {
    function BooleanLiteral(value) {
        this.value = value;
    }

    BooleanLiteral.prototype.toString = function() {
        if (this.value.lexeme === "yah" || this.value.lexeme === "true") {
            return "true";
        } else {
            return "false";
        }
    };

    BooleanLiteral.prototype.analyze = function(context) {
        return this.type = Type.BOOL;
    };

    BooleanLiteral.prototype.optimize = function() {
        return this;
    };

    return BooleanLiteral;

})();

module.exports = BooleanLiteral;