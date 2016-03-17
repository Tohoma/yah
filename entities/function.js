var Function, Type;

Type = require('./type');

Function = (function() {
    function Function(args, body) {
        this.params = args;
        this.body = body;
    }

    return Function;

})();

module.exports = Function;