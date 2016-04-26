var VariableReference;

VariableReference = (function() {
    function VariableReference(token) {
        this.token = token;
    }

    VariableReference.prototype.toString = function() {
        return this.token.lexeme;
    };

    VariableReference.prototype.analyze = function(context) {
        console.log("We are in variable Reference");
        this.referent = context.lookupVariable(this.token);
        return this.type = this.referent.type;
    };

    VariableReference.prototype.optimize = function() {
        return this;
    };

    return VariableReference;

})();

module.exports = VariableReference;