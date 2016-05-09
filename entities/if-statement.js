var BooleanLiteral, IfStatement;

BooleanLiteral = require('./boolean-literal');
Type = require('./type');

IfStatement = (function() {
    function IfStatement(condition, thenBody) {
        this.condition = condition;
        this.thenBody = thenBody;
    }

    IfStatement.prototype.toString = function() {
        return "(If " + this.condition + " " + this.thenBody + ")";
    };

    IfStatement.prototype.analyze = function(context) {
    	this.condition.analyze().mustBeBoolean();
    	// this.thenBody.analyze();
    	// return;
    };

    IfStatement.prototype.optimize = function() {
    	// TODO
    	return this;
    }

    return IfStatement;

})();

module.exports = IfStatement;