var FieldAccess;

error = require('../error/error');
variableReference = require('./variable-reference');
Type = require('./type');

FieldAccess = (function() {
    function FieldAccess(object, field) {
        this.object = object;
        this.field = field;
    }

    FieldAccess.prototype.toString = function() {
        return "(. " + this.object + " " + this.field + ")";
    };

    FieldAccess.prototype.analyze = function(context) {
        this.object.analyze(context);
        mustBeObject();
        if (this.field instanceof variableReference) {
            mustBeObjectField();
        }
        this.field.analyze(context);
        return this.type = this.field.type;
    }

    FieldAccess.prototype.optimize = function() {
        this.object.optimize();
        this.field.optimize();
        return this;
    }

    var mustBeObjectField = function() {
        if (object.type != Type.ARBITRARY) {
            error("Field not defined in this object");
        }
        return this.type = this.object.type
    }

    var mustBeObject = function() {
        if (this.object.type != type.DICT || this.object.type != type.ARBITRARY) {
            error("Cannot access field of this type", this.object.type);
        }
    }

    return FieldAccess;

})();

module.exports = FieldAccess;