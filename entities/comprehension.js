var Comprehension, ListLiteral;

ListLiteral = require('./list-literal');

Comprehension = (function() {
    function Comprehension(start, dots, end, increment) {
    /*function Comprehension( props ) {
        if(props.type.equals("for-in")) {
            this.id = props.id;
            this.expression = props.expression;
            this.iterable = props.iterable;
        } else {
            this.start = props.start;
            this.end = props.end;
            this.operator = props.operator;
        }
        this.type = props.type;
        this.increment = props.increment || 1;*/
        this.start = start;
        this.dots = dots;
        this.end = end;
        this.increment = increment || 1;
    }

    Comprehension.prototype.toString = function() {
        if (this.increment === undefined) {
            this.increment = 1;
        }
        console.log(this.dots);
        return "(" + this.start + " " + this.dots.lexeme + " " + this.end + " by " + this.increment + ")";
    };

    Comprehension.prototype.analyze = function(context) {
        this.start.analyze(context);
        this.end.analyze(context);
        if (this.increment) { this.increment.analyze(context); }
        this.type = Type.ListLiteral;
        return this.start.type.mustBeCompatibleWith(this.end.type, 'Comprehension must use integer operands exclusively');
    }

    return Comprehension;

})();

module.exports = Comprehension;