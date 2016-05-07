var ClassExp, Type;

Type = require('./type');

ClassExp = (function() {
    function ClassExp(args, body) {
        this.params = args;
        this.body = body;
    }

    ClassExp.prototype.analyze = function(context) {
        this.args.analyze(context);
        return this.body.analyze(context);
    }

    ClassExp.prototype.optimize = function() {
        this.args.optimize();
        this.body.optimize();
        return this;
    }

    return ClassExp;

})();

module.exports = ClassExp;