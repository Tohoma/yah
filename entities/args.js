var Args, Type;

Type = require('./type');

Args = (function() {
    function Args(item, type, defaultVal) {
        this.item = item;
        this.type = type;
        this.defaultVal = defaultVal;
    }

    Args.prototype.toString = function() {
    	var t = this.type ? ":" + this.type : "",
    		d = this.defaultVal ? "=" + this.defaultVal : "";
        return "(" + this.item + t + d + ")";
    };
    return Args;
})();

module.exports = Args;