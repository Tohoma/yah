var TupleLiteral, Type;
var chalk = require('chalk');

Type = require('./type');

TupleLiteral = (function() {
    function TupleLiteral(items) {
        this.items = items;
    }
    TupleLiteral.prototype.analyze = function (context) {
    	this.items.forEach(function(param){
    		param.analyze(context);
    	})
    	console.log(chalk.bgBlue(JSON.stringify(this.items)))
    	return
    }

    TupleLiteral.prototype.toString = function() {
        return "(" + this.items + ")";
    };

    TupleLiteral.prototype.analyze = function(context) {
    	this.items.forEach(function(item) { item.analyze(context); });
    	return this.type = Type.TUPLE;
    }

    TupleLiteral.prototype.length = function() {
    	return this.items.length;
    }
    return TupleLiteral;
})();

module.exports = TupleLiteral;