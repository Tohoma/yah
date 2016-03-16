var AnalysisContext, VariableDeclaration, error;

error = require('../error/error');

VariableDeclaration = require('../entities/variable-declaration');

AnalysisContext = (function() {
  function AnalysisContext(parent) {
    this.parent = parent;
    this.symbolTable = {};
  }

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
    return this.symbolTable[name] = entity;
  };

  AnalysisContext.prototype.lookupVariable = function(token) {
    var variable;
    variable = this.symbolTable[token.lexeme];
    if (variable) {
      return variable;
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