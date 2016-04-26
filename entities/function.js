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
    	functionContext = context.createChildContext();
    	this.args.forEach(function(param) {
    	console.log(param.token.lexeme)
    	varDec = new VariableDeclaration(param.token.lexeme, " ", Type.ARBITRARY)
    	param.addVariabletoContext(functionContext, varDec)

    	} )
    	
    	return this.body.analyze(functionContext, 1)
    }

    FunctionStatement.prototype.toString = function() {
        return "(Function (" + this.args.join(", ") + ") " + this.body + ")";
    };

    return FunctionStatement;

})();

module.exports = FunctionStatement;