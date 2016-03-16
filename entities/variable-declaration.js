var Type, VariableDeclaration;

Type = require('./type');

VariableDeclaration = (function() {
    function VariableDeclaration(id, type) {
        this.id = id;
        this.type = type;
    }

    VariableDeclaration.prototype.toString = function() {
        return "(Var :" + this.id.lexeme + " " + this.type + ")";
    };

    VariableDeclaration.prototype.analyze = function(context) {
        context.variableMustNotBeAlreadyDeclared(this.id);
        return context.addVariable(this.id.lexeme, this);
    };

    VariableDeclaration.prototype.optimize = function() {
        return this;
    };

    return VariableDeclaration;

})();

VariableDeclaration.ARBITRARY = new VariableDeclaration('<arbitrary>', Type.ARBITRARY);

module.exports = VariableDeclaration;