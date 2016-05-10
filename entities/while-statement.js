var BooleanLiteral, WhileStatement;

BooleanLiteral = require('./boolean-literal');

WhileStatement = (function() {
    function WhileStatement(condition, body) {
        this.condition = condition;
        this.body = body;
    }

    WhileStatement.prototype.toString = function() {
        return "(While (" + this.condition + ") " + this.body + ")";
    };

    WhileStatement.prototype.analyze = function(context) {
        this.condition.analyze(context);
        this.condition.type.mustBeBoolean('Condition in "while" statement must be boolean');
        return this.body.analyze(context);
    };

    WhileStatement.prototype.optimize = function() {
        this.condition = this.condition.optimize();
        this.body = this.body.optimize();
        if (this.condition instanceof BooleanLiteral && this.condition.value === false) {
            return null;
        }
        return this;
    };

    return WhileStatement;

})();

module.exports = WhileStatement;