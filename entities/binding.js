var Binding, VariableReference;

VariableReference = require('./variable-reference');

Binding = (function() {
    function Binding(key, value) {
        this.key = key;
        this.value = value;
    }

    Binding.prototype.toString = function() {
        return "(: " + this.key.lexeme + " " + this.value + ")";
    };

    Binding.prototype.analyze = function(context) {
        console.log("TODO: Binding")
        return;
    };

    Binding.prototype.analyze = function(context) {
        this.key.analyze(context);
        return this.value.analyze(context);
    };

    Binding.prototype.optimize = function() {
        this.key.optimize();
        this.value.optimize();
        return this;
    };

    return Binding;

})();

module.exports = Binding;