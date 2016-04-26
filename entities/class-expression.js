var ClassExp, Type;

Type = require('./type');

ClassExp = (function() {
    function ClassExp(args, body) {
        this.params = args;
        this.body = body;
    }

    return ClassExp;

})();

module.exports = ClassExp;