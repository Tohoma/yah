var AnalysisContext, VariableDeclaration, error;
var chalk = require('chalk');
error = require('../error/error');

VariableDeclaration = require('../entities/variable-declaration');

AnalysisContext = (function() {
    function AnalysisContext(parent) {
        this.parent = parent;
        this.symbolTable = {};
        this.globalSymbolTable = {};
        this.funFlag = false;
    }

    AnalysisContext.prototype.addGlobal = function (symbolTable) {
        this.funFlag = true
        this.globalSymbolTable = symbolTable;
    };

    AnalysisContext.initialContext = function() {
        return new AnalysisContext(null);
    };

    AnalysisContext.prototype.createChildContext = function() {
        return new AnalysisContext(this);
    };

    AnalysisContext.prototype.variableMustNotBeAlreadyDeclared = function(token) {
        if (this.symbolTable[token.lexeme]) {
            return error("Variable " + token.lexeme + " already declared", token);
        }
    };

    AnalysisContext.prototype.addVariable = function(name, entity) {
         // console.log(chalk.magenta("Analyzer"))
         // console.log(chalk.bgBlue("entity"));
         // console.log(entity);
        return this.symbolTable[name] = entity;
    };

    AnalysisContext.prototype.lookupVariable = function(token) {
        var variable;
        var globalVariable
        variable = this.symbolTable[token.lexeme];
        globalVariable = this.globalSymbolTable[token.lexeme]
        if (variable) {
            return variable;
        } else if (this.funFlag && globalVariable){
            return globalVariable;
        }else if (!this.parent) {
            error("Variable " + token.lexeme + " not found", token);
            return VariableDeclaration.ARBITRARY;
        } else {
            return this.parent.lookupVariable(token);
        }
    };

    return AnalysisContext;

})();

exports.initialContext = AnalysisContext.initialContext;