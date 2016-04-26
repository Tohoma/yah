var BooleanLiteral, IfStatement;

BooleanLiteral = require('./boolean-literal');

IfStatement = (function() {
    function IfStatement(condition, thenBody) {
        this.condition = condition;
        this.thenBody = thenBody;
    }

    IfStatement.prototype.toString = function() {
        return "(If " + this.condition + " " + this.thenBody + ")";
    };

    return IfStatement;

})();

module.exports = IfStatement;