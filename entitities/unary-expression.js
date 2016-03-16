var BooleanLiteral, IntegerLiteral, Type, UnaryExpression;

Type = require('./type');

IntegerLiteral = require('./integerliteral');

BooleanLiteral = require('./booleanliteral');

UnaryExpression = (function() {
    function UnaryExpression(op, operand) {
        this.op = op;
        this.operand = operand;
    }

    UnaryExpression.prototype.toString = function() {
        return "(" + this.op.lexeme + " " + this.operand + ")";
    };

    UnaryExpression.prototype.analyze = function(context) {
        this.operand.analyze(context);
        switch (this.op.lexeme) {
            case 'not':
                this.operand.type.mustBeBoolean('The "not" operator requires a boolean operand', this.op);
                return this.type = Type.BOOL;
            case '-':
                this.operand.type.mustBeInteger('The "negation" operator requires an integer operand', this.op);
                return this.type = Type.INT;
        }
    };

    UnaryExpression.prototype.optimize = function() {
        this.operand = this.operand.optimize();
        if (this.op.lexeme === 'not' && this.operand instanceof BooleanLiteral) {
            return new BooleanLiteral(!this.operand.value);
        } else if (this.op.lexeme === '-' && this.operand instanceof IntegerLiteral) {
            return new IntegerLiteral(-this.operand.value);
        } else {
            return this;
        }
    };

    return UnaryExpression;

})();

module.exports = UnaryExpression;