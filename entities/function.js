var chalk = require('chalk');
var FunctionStatement, Type, VariableDeclartion;

Type = require('./type');
VariableDeclaration = require('./variable-declaration.js')

FunctionStatement = (function() {
    function FunctionStatement(args, body, type) {
        this.args = args;
        this.body = body;
        this.type = type;

    };

    FunctionStatement.prototype.analyze = function (context) {
        //console.log("We are analying function");
        //console.log("The return type is " + context.returnType);
        newReturnType = context.returnType;
    	functionContext = context.createChildContext();
    	this.args.forEach(function(param) {
    	varDec = new VariableDeclaration(param.token.lexeme, " ", Type.ARBITRARY)
    	param.addVariabletoContext(functionContext, varDec)

    	} )
        functionContext.addGlobal(context.symbolTable);
        functionContext.returnType = newReturnType;
        //console.log(newReturnType);

    	return this.body.analyze(functionContext)

    }

    FunctionStatement.prototype.toString = function() {
        return "(Function (" + this.args + ") " + this.body + ")";
    };

    return FunctionStatement;

})();

module.exports = FunctionStatement;
