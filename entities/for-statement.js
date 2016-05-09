var ForStatement, Type;

Type = require('./type');
BooleanLiteral = require('./boolean-literal');

ForStatement = (function() {
    function ForStatement(id, iterable, body) {
        this.id = id;
        this.iterable = iterable;
        this.body = body;
    }

    ForStatement.prototype.toString = function() {
        return "(For " + (this.id ? this.id.lexeme : "i") + " " + this.iterable + " " + this.body + ")";
    };

    ForStatement.prototype.analyze = function(context) {
        this.id.analyze(context);
        this.iterable.analyze(context);
        this.iterable.type.mustBeBoolean("Condition in for loop must be boolean");
        return this.body.analyze(context);
    };

    ForStatement.prototype.optimize = function () {
        this.id.optimize();
        this.iterable.optimize();
        if (this.iterable instanceof BooleanLiteral && this.iterable.value() === false) {
            return null;
        }
        return this;
    };

    return ForStatement;

})();

module.exports = ForStatement;