var chalk = require('chalk');
var FunctionStatement, Type, VariableDeclartion;

Type = require('./type');
VariableDeclaration = require('./variable-declaration.js')

FunctionStatement = (function() {
    function FunctionStatement(args, body, type) {
        this.args = args;
        this.body = body;
        this.type = type;
        console.log((this.args))
    };

    FunctionStatement.prototype.analyze = function (context) {
    	functionContext = context.createChildContext();
    	this.args.forEach(function(param) {
    	varDec = new VariableDeclaration(param.token.lexeme, " ", Type.ARBITRARY)
    	param.addVariabletoContext(functionContext, varDec)

    	} )
        functionContext.addGlobal(context.symbolTable);

    	return this.body.analyze(functionContext)
    }

    FunctionStatement.prototype.toString = function() {
        return "(Function (" + this.args + ") " + this.body + ")";
    };

    return FunctionStatement;

})();

module.exports = FunctionStatement;
