var ClassExp, Type;

Type = require('./type');

ClassExp = (function() {
    function ClassExp(body) {
        this.body = body;
    }

    ClassExp.prototype.toString = function() {
        return "(Class (" + this.body.join(", ") + "))";
    }

    return ClassExp;

})();

module.exports = ClassExp;