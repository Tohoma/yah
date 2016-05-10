var FunctionCall, Type;

Type = require('./type');

FunctionCall = (function() {
    function FunctionCall(id, args) {
        this.id = id;
        this.args = args;
    };

    FunctionCall.prototype.toString = function() {
        return "(FunCall " + this.id + " " + this.args.toString() + ")";
    };

    FunctionCall.prototype.analyze = function(context) {
        // console.log("TODO: FunctionCall");
        this.id.analyze(context);
        this.args.expList.items.forEach(function(item) {
            item.analyze(context);
        });
        return this.type = Type.ARBITRARY;
    };

    FunctionCall.prototype.optimize = function() {
        return this;
    };

    var mustHaveCorrectArgs = function() {
        var params = this.id.referent.value.params;
        var error = this.id.token.lexeme + "() takes exactly " + params.length + " arguments (" + this.args.length + " given)";
        if (!(this.args.length === params.length)) {
            throw new CustomError(error, location);
        }
    }

    return FunctionCall;

})();

module.exports = FunctionCall;