var Binding, BindList, Type;

Binding = require('./binding');
Type = require('./type');

BindList = (function() {
    function BindList(items) {
        this.items = items;
    }

    BindList.prototype.toString = function() {
        var output = '( ';
        var ref = this.items;
        for (var i = 0; i < this.items.length; i += 1) {
            output += this.items[i].toString();
        }
        output += ')';
        return output;
    };

    BindList.prototype.analyze = function(context) {
        var ref = this.items;
        for (i in this.items) {
            this.items[ref[i]].analyze(context);
        }
    };

    BindList.prototype.optimize = function() {
        var ref = this.items;
        for (i in this.items) {
            this.items[ref[i]].optimize();
        }
    };

    return BindList;
})();

module.exports = BindList;