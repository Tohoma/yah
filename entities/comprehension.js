var Comprehension, ListLiteral;

ListLiteral = require('./list-literal');

Comprehension = (function() {
    //function Comprehension(start, ops, end, increment) {
    function Comprehension( props ) {
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
        this.increment = props.increment || 1;
        /*this.expression = expression;
        this.start = start;
        this.end = end;
        this.increment = increment || 1;*/
    }

    Comprehension.prototype.toString = function() {
        if (this.increment === undefined) {
            this.increment = 1;
        }
        console.log(this.start);
        return "(" + this.expression + " " + this.start + " " + this.end + " by " + this.increment + ")";
    };

    return Comprehension;

})();

module.exports = Comprehension;