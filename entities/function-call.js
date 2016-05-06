var FunctionCall, Type;

Type = require('./type');

FunctionCall = (function() {
    function FunctionCall(id, args) {
        this.id = id;
        this.args = args;
    };

    FunctionCall.prototype.toString = function() {
        return "(FunCall " + this.id + " (" + this.args.join(", ") + "))";
    };

    FunctionCall.prototype.analyze = function() {
    	console.log("TODO: FunctionCall");
    	return;
    }

    return FunctionCall;

})();

module.exports = FunctionCall;