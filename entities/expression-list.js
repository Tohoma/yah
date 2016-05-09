var ExpList, Type;

Type = require('./type');

ExpList = (function() {
    function ExpList(items) {
        this.items = items;
    }

    ExpList.prototype.toString = function() {
        var result = [];
        for (var i = 0; i < this.items.length; i += 1) {
            result.push(this.items[i].toString());
        }
        return result.join(", ");
    };

    ExpList.prototype.analyze = function(context) {
        return;
    };

    ExpList.prototype.optimize = function() {
        return this;
    };

    return ExpList;

})();

module.exports = ExpList;