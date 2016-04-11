var BooleanLiteral, TernaryExpression, Type;

Type = require('./type');

BooleanLiteral = require('./boolean-literal');

TernaryExpression = (function() {
    function TernaryExpression(expression1, condition, expression2) {
        this.expression1 = expression1;
        this.condition = condition;
        this.expression2 = expression2;
    }

    TernaryExpression.prototype.toString = function() {
        if (this.condition) {
            if (this.expression2) {
                return "(" + this.expression1 +  " If " + this.condition + " Else " + this.expression2 + ")";
            }
            return "(" + this.expression1 + " If " + this.condition + ")";
        }
        return "(" + this.expression1 + ")";
    };

    TernaryExpression.prototype.analyze = function(context) {
        this.expression1.analyze(context);
        this.condition.analyze(context);
        this.expression2.analyze(context);
            if (this.condition) {
                return this.condition.type.mustBeBoolean('The condition expression must result in a boolean literal');
            }
        return this;
    };

    TernaryExpression.prototype.optimize = function() {
        this.expression1.optimize();
        this.condition.optimize();
        this.expression2.optimize();
        if (this.condition) {
            if (this.expression2) {
                return this.condition.value ? expression1 : expression2;
            }
            return this.condition.value ? expression1 : this;
        }
        return this;
    };

    return TernaryExpression;

})();

module.exports = TernaryExpression;