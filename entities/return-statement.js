var ReturnStatement;

ReturnStatement = (function() {
    function ReturnStatement(exp) {
        this.exp = exp;
    }

    ReturnStatement.prototype.toString = function() {
        return "(Return " + this.exp + ")";
    };

    return ReturnStatement;
})();

module.exports = ReturnStatement;