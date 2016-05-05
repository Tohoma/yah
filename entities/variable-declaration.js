var Type, VariableDeclaration;

var chalk = require('chalk');
Type = require('./type');
error = require('../error/error');

VariableDeclaration = (function() {
        function VariableDeclaration(id, value, type) {
            this.id = id;
            this.value = value;
            this.type = type;
            if (this.value.items) {
                //console.log("Has items")
            } else if (this.value.args) {
                //console.log("Creating new variable declaration")
            }
           
        }

        VariableDeclaration.prototype.toString = function() {
            if (this.value === undefined) {
                return "(is (" + this.id.lexeme + " NONE))";  
            }
            return "(is (" + this.id.lexeme + " " + this.value + "))";
        };

        VariableDeclaration.prototype.analyze = function(context) {
        //console.log("We are analyzing variable declaration")
         // this.value.args[0].analyze(context);
          console.log("Analyzing first thingy")
            console.log(chalk.bgBlue(JSON.stringify(this.value)))
            
             //console.log(chalk.bgBlue("This is the value of a function " + JSON.stringify(this.value)))
            context.variableMustNotBeAlreadyDeclared(this.id);
            if((this.value.items)) {
                this.value.analyze(context);
                this.value.type = Type.ARBITRARY
                //console.log(this.value.type)
            }else if (this.value.args && this.type) {
                //console.log("We got a function")
                context.returnType = this.type;
                //console.log("The context return type is "+context.returnType);
                this.value.analyze(context);
                return context.addVariable(this.id.lexeme, this, this.type)
            }else if (this.type){
                //console.log("Error checking!")
                this.value.analyze(context);
                this.type.mustBeCompatibleWith(this.value.type)
            } else {
                this.value.analyze(context);
                this.type = Type.ARBITRARY
            }
            return context.addVariable(this.id.lexeme, this, this.value.type);
        
    };

    VariableDeclaration.prototype.optimize = function() {
        return this;
    };

    return VariableDeclaration;

})();

VariableDeclaration.ARBITRARY = new VariableDeclaration('<arbitrary>', Type.ARBITRARY);

module.exports = VariableDeclaration;