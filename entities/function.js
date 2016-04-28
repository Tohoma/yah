var FunctionStatement, Type;

Type = require('./type');

FunctionStatement = (function() {
    function FunctionStatement(args, body, type) {
        this.args = args;
        this.body = body;
        this.type = type;
    };

    FunctionStatement.prototype.toString = function() {
        return "(Function (" + this.args + ") " + this.body + ")";
    };

    return FunctionStatement;

})();

module.exports = FunctionStatement;