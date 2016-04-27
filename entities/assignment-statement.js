var AssignmentStatement, VariableReference;
error = require('../error/error');

VariableReference = require('./variable-reference');

AssignmentStatement = (function() {
    function AssignmentStatement(target, source) {
        this.target = target;
        this.source = source;
    }

    AssignmentStatement.prototype.toString = function() {
        return "(be (" + this.target + " " + this.source + "))";
    };

    AssignmentStatement.prototype.analyze = function(context) {
        this.target.analyze(context);
        this.source.analyze(context);
        if (error.count > 0) {
            return;
        }
        return this.source.type.mustBeCompatibleWith(this.target.type, 'Type mismatch in assignment');
    };

    AssignmentStatement.prototype.optimize = function() {
        this.target = this.target.optimize();
        this.source = this.source.optimize();
        if (this.source instanceof VariableReference && this.target.referent === this.source.referent) {
            null;
        }
        return this;
    };

    return AssignmentStatement;

})();

module.exports = AssignmentStatement;