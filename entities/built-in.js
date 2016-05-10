var BuiltIn, Type;

Type = require('./type');

BuiltIn = (function() {
    function BuiltIn() {}

    BuiltIn.entities = {
        print: {
            value: {
                params: [{ value: { token: 'str' }}]
            },
            return: Type.ARBITRARY,
            generateCode: function(args) {
                return 'console.log ' + args + ';';
            }
        },

        gt: {
            value: {
                params: [{ value: { token: 'int' }}]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var str = "(";
                for (var i = 1; i < args.length; i++) {
                    str += "(" + args[i - 1] + " > " + args[i] + ") ";
                }

                str += ")";
                return str;
            }
        },

        lt: {
            value: {
                params: [{ value: { token: 'int' }}]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var str = "(";
                for (var i = 1; i < args.length; i++) {
                    str += "(" + args[i - 1] + " < " + args[i] + ") ";
                }

                str += ")";
                return str;
            }
        },

        eq: {
            value: {
                params: [{ value: { token: 'int' }}]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var str = "(";
                for (var i = 1; i < args.length; i++) {
                    str += "(" + args[i - 1] + " === " + args[i] + ") ";
                }

                str += ")";
                return str;
            }
        },

        leq: {
            value: {
                params: [{ value: { token: 'int' }}]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var str = "(";
                for (var i = 1; i < args.length; i++) {
                    str += "(" + args[i - 1] + " <= " + args[i] + ") ";
                }

                str += ")";
                return str;
            }
        },

        geq: {
            value: {
                params: [{ value: { token: 'int' }}]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var str = "(";
                for (var i = 1; i < args.length; i++) {
                    str += "(" + args[i - 1] + " >= " + args[i] + ") ";
                }

                str += ")";
                return str;
            }
        },

        neq: {
            value: {
                params: [{ value: { token: 'int' }}]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var str = "(";
                for (var i = 1; i < args.length; i++) {
                    str += "(" + args[i - 1] + " !== " + args[i] + ") ";
                }

                str += ")";
                return str;
            }
        }
    }

    return BuiltIn;
})();

module.exports = BuiltIn;