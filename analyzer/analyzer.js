var AnalysisContext, VariableDeclaration, error, BuiltIn;
var chalk = require('chalk');
error = require('../error/error');

BuiltIn = require('../entities/built-in'),
    VariableDeclaration = require('../entities/variable-declaration');

AnalysisContext = (function() {
    function AnalysisContext(parent, symbolTable) {
        this.parent = parent;
        this.symbolTable = symbolTable || {};
        this.globalSymbolTable = {};
        this.funFlag = false;
        this.returnType;
    }

    AnalysisContext.prototype.addGlobal = function(symbolTable) {
        this.funFlag = true;
        this.globalSymbolTable = symbolTable;
    };

    AnalysisContext.initialContext = function() {
        return new AnalysisContext(null, BuiltIn.entities);
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
        } else if (this.funFlag && globalVariable) {
            return globalVariable;
        } else if (!this.parent) {
            error("Variable " + token.lexeme + " not found", token);
            return VariableDeclaration.ARBITRARY;
        } else {
            return this.parent.lookupVariable(token);
        }
    };

    return AnalysisContext;

})();

exports.initialContext = AnalysisContext.initialContext;