var Binding, VariableReference;

VariableReference = require('./variable-reference');

Binding = (function() {
    function Binding(key, value) {
        this.key = key;
        this.value = value;
    }

    Binding.prototype.toString = function() {
        return "(: " + this.key + " " + this.value + ")";
    };

    return Binding;

})();

module.exports = Binding;