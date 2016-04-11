var ForStatement, Type;

Type = require('./type');

ForStatement = (function() {
    function ForStatement(id, iterable, body) {
        this.id = id;
        this.iterable = iterable;
        this.body = body;
    }

    ForStatement.prototype.toString = function() {
        return "(For " + this.id + " " + this.iterable + " " + this.body + ")";
    }

    return ForStatement;

})();

module.exports = ForStatement;