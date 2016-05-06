var BooleanLiteral, IfElseStatement;

BooleanLiteral = require('./boolean-literal');

IfElseStatement = (function() {
    function IfElseStatement(condition, thenBody, elseIfBody, elseBody) {
        this.condition = condition;
        this.thenBody = thenBody;
        this.elseBody = elseBody;
        this.elseIfBody = elseIfBody;
    }

    IfElseStatement.prototype.toString = function() {
        var str = this.elseIfBody.slice(0, 2).join(" ");
        for (var i = 2; i < this.elseIfBody.length; i += 2) {
            str += " Elif " + this.elseIfBody.slice(i, i + 2).join(" ");
        }
        if (this.elseIfBody.length > 0) {
            if (this.elseBody) {
                return "(If " + this.condition + " " + this.thenBody + " Elif " + str + " Else " + this.elseBody + ")";
            }
            return "(If " + this.condition + " " + this.thenBody + " Elif " + str + ")";
        }
        return "(If " + this.condition + " " + this.thenBody + " Else " + this.elseBody + ")";
    };

    return IfElseStatement;

})();

module.exports = IfElseStatement;