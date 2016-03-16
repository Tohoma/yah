var WriteStatement;

WriteStatement = (function() {
    function WriteStatement(expressions) {
        this.expressions = expressions;
    }

    WriteStatement.prototype.toString = function() {
        return "(Write " + (this.expressions.join(' ')) + ")";
    };

    WriteStatement.prototype.analyze = function(context) {
        var e, i, len, ref, results;
        ref = this.expressions;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
            e = ref[i];
            e.analyze(context);
            results.push(e.type.mustBeInteger('Expressions in "write" statement must have type integer'));
        }
        return results;
    };

    WriteStatement.prototype.optimize = function() {
        var e;
        this.expressions = (function() {
            var i, len, ref, results;
            ref = this.expressions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                e = ref[i];
                results.push(e.optimize());
            }
            return results;
        }).call(this);
        return this;
    };

    return WriteStatement;

})();

module.exports = WriteStatement;