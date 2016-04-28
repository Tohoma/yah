var BinaryExpression = require('./variable-reference'),
    BooleanLiteral = require('./boolean-literal'),
    IntegerLiteral = require('./integer-literal'),
    StringLiteral = require('./string-literal'),
    Type = require('./type'),
    VariableReference,
    foldBooleanConstants,
    foldIntegerConstants,
    isIntegerLiteral,
    sameVariable;

BinaryExpression = (function() {
    function BinaryExpression(op1, left, right) {
        this.op = op1;
        this.left = left;
        this.right = right;
    }

    BinaryExpression.prototype.toString = function() {
        return "(" + this.op.lexeme + " " + this.left + " " + this.right + ")";
    };

    BinaryExpression.prototype.analyze = function(context) {
        var op;
        this.left.analyze(context);
        this.right.analyze(context);
        op = this.op.lexeme;
        switch (op) {
            case '<':
            case '>=':
            case '<=':
            case '>':
                this.mustHaveIntegerOperands();
                return this.type = Type.BOOL;
            case '==':
            case '!eq': // could be token in language revisit FLAG
                this.mustHaveCompatibleOperands();
                return this.type = Type.BOOL;
            case 'and':
            case '&&':
            case 'or':
            case '||':
                this.mustHaveBooleanOperands();
                return this.type = Type.BOOL;
            default:
                this.mustHaveIntegerOperands();
                return this.type = Type.INT;
        }
    };

    BinaryExpression.prototype.optimize = function() {
        this.left = this.left.optimize();
        this.right = this.right.optimize();
        var stringMultiplication = (this.left instanceof StringLiteral && this.right instanceof IntegerLiteral ||
            this.left instanceof IntegerLiteral && this.right instanceof StringLiteral) && this.op.lexeme === "*";

        if (this.left instanceof IntegerLiteral && this.right instanceof IntegerLiteral) {
            return foldIntegerConstants(this.op.lexeme, +this.left.value, +this.right.value).value;
        } else if (this.left instanceof BooleanLiteral && this.right instanceof BooleanLiteral) {
            return foldBooleanConstants(this.op.lexeme, this.left.value, this.right.value).value;
        } else if (stringMultiplication) {
            return foldStringMultiplication(this.left, this.right);
        } else {
            switch (this.op.lexeme) {
                case '+':
                    if (isIntegerLiteral(this.right, 0)) {
                        return this.left;
                    }
                    if (isIntegerLiteral(this.left, 0)) {
                        return this.right;
                    }
                    break;
                case '-':
                    if (isIntegerLiteral(this.right, 0)) {
                        return this.left;
                    }
                    if (sameVariable(this.left, this.right)) {
                        return new IntegerLiteral(0);
                    }
                    break;
                case '*':
                    if (isIntegerLiteral(this.right, 1)) {
                        return this.left;
                    }
                    if (isIntegerLiteral(this.left, 1)) {
                        return this.right;
                    }
                    if (isIntegerLiteral(this.right, 0)) {
                        return new IntegerLiteral(0);
                    }
                    if (isIntegerLiteral(this.left, 0)) {
                        return new IntegerLiteral(0);
                    }
                    break;
                case '/':
                    if (isIntegerLiteral(this.right, 1)) {
                        return this.left;
                    }
                    if (sameVariable(this.left, this.right)) {
                        return new IntegerLiteral(1);
                    }
            }
        }
        return this;
    };

    BinaryExpression.prototype.mustHaveIntegerOperands = function() {
        var error;
        error = this.op.lexeme + " must have integer operands";
        this.left.type.mustBeCompatibleWith(Type.INT, error, this.op);
        return this.right.type.mustBeCompatibleWith(Type.INT, error, this.op);
    };

    BinaryExpression.prototype.mustHaveBooleanOperands = function() {
        var error;
        error = this.op.lexeme + " must have boolean operands";
        this.left.type.mustBeCompatibleWith(Type.BOOL, error, this.op);
        return this.right.type.mustBeCompatibleWith(Type.BOOL, error, this.op);
    };

    BinaryExpression.prototype.mustHaveCompatibleOperands = function() {
        var error;
        error = this.op.lexeme + " must have mutually compatible operands";
        return this.left.type.mustBeMutuallyCompatibleWith(this.right.type, error, this.op);
    };

    return BinaryExpression;

})();

isIntegerLiteral = function(operand, value) {
    return operand instanceof IntegerLiteral && operand.value === value;
};

sameVariable = function(exp1, exp2) {
    return exp1 instanceof VariableReference && exp2 instanceof VariableReference && exp1.referent === exp2.referent;
};

foldIntegerConstants = function(op, x, y) {
    switch (op) {
        case '+':
            return new IntegerLiteral(x + y);
        case '-':
            return new IntegerLiteral(x - y);
        case '*':
            return new IntegerLiteral(x * y);
        case '/':
            return new IntegerLiteral(x / y);
        case '<':
            return new BooleanLiteral(x < y);
        case '<=':
            return new BooleanLiteral(x <= y);
        case '==':
            return new BooleanLiteral(x === y);
        case '!=':
            return new BooleanLiteral(x !== y);
        case '>=':
            return new BooleanLiteral(x >= y);
        case '>':
            return new BooleanLiteral(x > y);
    }
};

foldBooleanConstants = function(op, x, y) {
    switch (op) {
        case '==':
            return new BooleanLiteral(x === y);
        case '!=':
            return new BooleanLiteral(x !== y);
        case 'and':
            return new BooleanLiteral(x && y);
        case 'or':
            return new BooleanLiteral(x || y);
    }
};

foldStringMultiplication = function(x, y) {
    var i;
    var multipliedString = "";
    console.log(x)
    if (x instanceof IntegerLiteral) {
        for (i = 0; i < x.value; i += 1) {
            multipliedString += y.value;
        }
    } else {
        for (i = 0; i < y.value; i += 1) {
            multipliedString += x.value;
        }
    }
    return multipliedString;
};

module.exports = BinaryExpression;