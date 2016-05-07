var BindList, Type;

Type = require('./type');

BindList = (function() {
    function Binding(items) {
        this.items = items;
    }

    BindList.prototype.toString = function() {
        return "( " + this.items + " )";
    }

    BindList.prototype.analyze = function(context) {
        var ref = this.items;
        for (i in this.items) {
            this.items[ref[i]].analyze(context);
        }
    }

    BindList.prototype.optimize = function() {
        var ref = this.items;
        for (i in this.items) {
            this.items[ref[i]].optimize();
        }
    }
});