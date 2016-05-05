var Type, VariableDeclaration;

Type = require('./type');
error = require('../error/error');

VariableDeclaration = (function() {
        function VariableDeclaration(id, value, type) {
            this.id = id;
            this.value = value;
            this.type = type;
        }

        VariableDeclaration.prototype.toString = function() {
            if (this.value === undefined) {
                return "(is (" + this.id.lexeme + " NONE))";  
            }
            return "(is (" + this.id.lexeme + " " + this.value + "))";
        };

        VariableDeclaration.prototype.analyze = function(context) {
            this.value.analyze(context);
            context.variableMustNotBeAlreadyDeclared(this.id);
            if (this.type) {
                if (this.type.kind != this.value.type.toString()) {
                    error("Type mismatch", this.type);
                } else {
                    this.type = this.value.type
                }
            } else {
                this.type = Type.ARBITRARY
            }
            return context.addVariable(this.id.lexeme, this, this.value.type);
        
    };

    VariableDeclaration.prototype.optimize = function() {
        return this;
    };

    return VariableDeclaration;

})();

VariableDeclaration.ARBITRARY = new VariableDeclaration('<arbitrary>', Type.ARBITRARY);

module.exports = VariableDeclaration;