var ReadStatement;

ReadStatement = (function() {
    function ReadStatement(varrefs) {
        this.varrefs = varrefs;
    }

    ReadStatement.prototype.toString = function() {
        return "(Read " + (this.varrefs.join(' ')) + ")";
    };

    ReadStatement.prototype.analyze = function(context) {
        var i, len, ref, results, v;
        ref = this.varrefs;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
            v = ref[i];
            v.analyze(context);
            results.push(v.type.mustBeInteger('Variables in "read" statement must have type integer'));
        }
        return results;
    };

    ReadStatement.prototype.optimize = function() {
        return this;
    };

    return ReadStatement;

})();

module.exports = ReadStatement;