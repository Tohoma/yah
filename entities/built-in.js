var BuiltIn, Type;

Type = require('./type');

BuiltIn = (function() {
    function BuiltIn() {}

    BuiltIn.entities = {
        print: {
            value: {
                params: [{
                    value: {
                        token: 'str'
                    }
                }]
            },
            return: Type.ARBITRARY,
            generateCode: function(args) {
                return 'console.log ' + args + ';';
            }
        },

        gt: {
            value: {
                params: [{
                    value: {
                        token: 'int'
                    }
                }]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var result = []
                for (var i = 1; i < args.expList.items.length; i++) {
                    result.push("(" + args.expList.items[i - 1] + " > " + args.expList.items[i] + ")");
                }

                return "(" + result.join(" && ") + ")";
            }
        },

        lt: {
            value: {
                params: [{
                    value: {
                        token: 'int'
                    }
                }]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var result = []
                for (var i = 1; i < args.expList.items.length; i++) {
                    result.push("(" + args.expList.items[i - 1] + " < " + args.expList.items[i] + ")");
                }

                return "(" + result.join(" && ") + ")";
            }
        },

        eq: {
            value: {
                params: [{
                    value: {
                        token: 'int'
                    }
                }]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var result = []
                for (var i = 1; i < args.expList.items.length; i++) {
                    result.push("(" + args.expList.items[i - 1] + " === " + args.expList.items[i] + ")");
                }

                return "(" + result.join(" && ") + ")";
            }
        },

        leq: {
            value: {
                params: [{
                    value: {
                        token: 'int'
                    }
                }]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var result = []
                for (var i = 1; i < args.expList.items.length; i++) {
                    result.push("(" + args.expList.items[i - 1] + " <= " + args.expList.items[i] + ")");
                }

                return "(" + result.join(" && ") + ")";
            }
        },

        geq: {
            value: {
                params: [{
                    value: {
                        token: 'int'
                    }
                }]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var result = []
                for (var i = 1; i < args.expList.items.length; i++) {
                    result.push("(" + args.expList.items[i - 1] + " >= " + args.expList.items[i] + ")");
                }

                return "(" + result.join(" && ") + ")";
            }
        },

        neq: {
            value: {
                params: [{
                    value: {
                        token: 'int'
                    }
                }]
            },
            return: Type.BOOL,
            generateCode: function(args) {
                var result = []
                for (var i = 1; i < args.expList.items.length; i++) {
                    result.push("(" + args.expList.items[i - 1] + " !== " + args.expList.items[i] + ")");
                }

                return "(" + result.join(" && ") + ")";
            }
        }
    }

    return BuiltIn;
})();

module.exports = BuiltIn;