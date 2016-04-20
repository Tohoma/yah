var Comprehension, ListLiteral;

ListLiteral = require ('./list-literal');

Comprehension = (function() {
    function Comprehension(start, dots, end, increment) {
        this.start = start;
        this.dots = dots;
        this.end = end;
        this.increment = increment;
    }

    Comprehension.prototype.toString = function() {
    	if (this.increment === undefined) {
    		this.increment = 1;
    	}
        return "(" + this.start + " " + this.dots.lexeme + " " + this.end + " by " + this.increment + ")";
    };

    return Comprehension;

})();

module.exports = Comprehension;