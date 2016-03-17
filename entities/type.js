var Type, cache, error;

error = require('../error/error');

cache = {};

Type = (function() {
    function Type(name1) {
        this.name = name1;
        cache[this.name] = this;
    }

    Type.BOOL = new Type('bool');
    Type.INT = new Type('int');
    Type.STR = new Type('str');
    Type.FLOAT = new Type('float');
    Type.UNDEFINED = new Type('undefined');
    Type.NAN = new Type('nan');
    Type.NILL = new Type('nill');
    Type.LIST = new Type('list');
    Type.TUPLE = new Type('tuple');
    Type.DICT = new Type('dict');
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
    STR: Type.STR,
    FLOAT: Type.FLOAT,
    UNDEFINED: Type.UNDEFINED,
    NAN: Type.NAN,
    NILL: Type.NILL,
    LIST: Type.LIST,
    TUPLE: Type.TUPLE,
    DICT: Type.DICT,
    forName: function(name) {
        return cache[name];
    }
};