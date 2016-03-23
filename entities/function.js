var FunctionStatement, Type;

Type = require('./type');

FunctionStatement = (function() {
    function FunctionStatement(args, body) {
        this.params = args;
        this.body = body;
    }

    return FunctionStatement;

})();

module.exports = FunctionStatement;