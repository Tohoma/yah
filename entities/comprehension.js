var Comprehension, ListLiteral;

ListLiteral = require('./list-literal');

Comprehension = (function() {
    function Comprehension(start, dots, end, increment) {
        this.start = start;
        this.dots = dots;
        this.end = end;
        this.increment = increment || 1;
    }

    Comprehension.prototype.toString = function() {
        if (this.increment === undefined) {
            this.increment = 1;
        }
        return "(" + this.start + " " + this.dots.lexeme + " " + this.end + " by " + this.increment + ")";
    };

    Comprehension.prototype.analyze = function(context) {
        this.start.analyze(context);
        this.end.analyze(context);
    }

    Comprehension.prototype.omptimize = function() {
        this.start = this.start.optimize();
        this.end = this.end.optimize();
        return this;
    }

    return Comprehension;

})();

module.exports = Comprehension;