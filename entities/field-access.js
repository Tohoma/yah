var FieldAccess, IfElseStatement;

BooleanLiteral = require('./boolean-literal');

FieldAccess = (function() {
    function FieldAccess(object, field) {
        this.object = object;
        this.field = field;
    }

    FieldAccess.prototype.toString = function() {
        return "(. " + this.object + " " + this.field + ")";
    };

    return FieldAccess;

})();

module.exports = FieldAccess;