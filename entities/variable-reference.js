var VariableReference, Type;
Type = require('./type');

VariableReference = (function() {
    function VariableReference(token) {
        this.token = token;
    }

    VariableReference.prototype.toString = function() {
        return this.token.lexeme;
    };

    VariableReference.prototype.analyze = function(context) {
        this.referent = context.lookupVariable(this.token);
        return this.type = this.referent.type;
    };

    VariableReference.prototype.addVariabletoContext = function(context, entity) {
        return context.addVariable(this.token.lexeme,entity,Type.ARBITRARY)
    }

    VariableReference.prototype.optimize = function() {
        return this;
    };

    return VariableReference;

})();

module.exports = VariableReference;