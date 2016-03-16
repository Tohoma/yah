var Type, cache, error;

error = require('../error');

cache = {};

Type = (function() {
    function Type(name1) {
        this.name = name1;
        cache[this.name] = this;
    }

    Type.BOOL = new Type('bool');

    Type.INT = new Type('int');

    Type.ARBITRARY = new Type('<arbitrary_type>');

    Type.prototype.toString = function() {
        return this.name;
    };

    Type.prototype.mustBeInteger = function(message, location) {
        return this.mustBeCompatibleWith(Type.INT, message);
    };

    Type.prototype.mustBeBoolean = function(message, location) {
        return this.mustBeCompatibleWith(Type.BOOL, message);
    };

    Type.prototype.mustBeCompatibleWith = function(otherType, message, location) {
        if (!this.isCompatibleWith(otherType)) {
            return error(message, location);
        }
    };

    Type.prototype.mustBeMutuallyCompatibleWith = function(otherType, message, location) {
        if (!(this.isCompatibleWith(otherType || otherType.isCompatibleWith(this)))) {
            return error(message, location);
        }
    };

    Type.prototype.isCompatibleWith = function(otherType) {
        return this === otherType || this === Type.ARBITRARY || otherType === Type.ARBITRARY;
    };

    return Type;

})();

module.exports = {
    BOOL: Type.BOOL,
    INT: Type.INT,
    ARBITRARY: Type.ARBITRARY,
    forName: function(name) {
        return cache[name];
    }
};