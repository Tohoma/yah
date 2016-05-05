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

    return Binding;

})();

module.exports = Binding;