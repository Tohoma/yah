var Args, Type;

Type = require('./type');

Args = (function() {
    function Args(expList) {
        this.expList = expList;
    }

    Args.prototype.toString = function() {
        return "(" + this.expList.toString() + ")";
    };

    Args.prototype.analyze = function(context) {
        return;
    };

    Args.prototype.optimize = function() {
        return this;
    };

    return Args;

})();

module.exports = Args;