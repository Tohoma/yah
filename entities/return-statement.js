var ReturnStatement, error;
var chalk = require('chalk');
error = require('../error/error');

ReturnStatement = (function() {
    function ReturnStatement(exp) {
        this.exp = exp;
    }

    ReturnStatement.prototype.toString = function() {
        return "(Return " + this.exp + ")";
    };

    ReturnStatement.prototype.analyze = function(context, num) {
        this.exp.analyze(context);
        //console.log("The return type for the context is " + context.returnType)
        console.log(context.globalSymbolTable);
        try {
            this.exp.type.mustBeCompatibleWith(context.returnType, "Return type mismatch");
        } catch (e) {
            error("Return type does not match function type");
        }



        return
    }

    return ReturnStatement;
})();

module.exports = ReturnStatement;