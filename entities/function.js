var FunctionStatement, Type;

Type = require('./type');

FunctionStatement = (function() {
    function FunctionStatement(args, body, type) {
        this.args = args;
        this.body = body;
        this.type = type;
    };

    FunctionStatement.prototype.analyze = function (context) {
    	console.log("The body is:")
    	console.log(this.body)
    	return this.body.analyze(context, 1)
    }

    FunctionStatement.prototype.toString = function() {
        return "(Function (" + this.args.join(", ") + ") " + this.body + ")";
    };

    return FunctionStatement;

})();

module.exports = FunctionStatement;