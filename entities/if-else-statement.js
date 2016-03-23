var BooleanLiteral, IfElseStatement;

BooleanLiteral = require('./boolean-literal');

IfElseStatement = (function() {
    function IfElseStatement(condition, thenBody, elseBody) {
        this.condition = condition;
        this.thenBody = thenBody;
        this.elseBody = elseBody;
    }

    IfElseStatement.prototype.toString = function() {
        if (this.elseBody) {
            return "(If " + this.condition + " " + this.thenBody + " Else " + this.elseBody + ")";
        }
        return "(If " + this.condition + " " + this.thenBody + ")";
    };

    return IfElseStatement;

})();

module.exports = IfElseStatement;