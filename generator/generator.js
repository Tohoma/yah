var Generator = (function() {

    var util = require('util');
    var HashMap = require('hashmap').HashMap;
    module.exports = function(program) {
        return generate(program)
    }

    indentPadding = 4;
    indentLevel = 0;

    var emit = function(line) {
        var pad;
        pad = indentPadding * indentLevel;
        return console.log(Array(pad + 1).join(' ') + line);
    }

    var makeOperator = function(operator) {
        return {
            is: '=',
            be: '=',
            and: '&&',
            or: '||',
            eq: "==",
            neq: '!=',
            yah: 'true',
            nah: 'false',
            not: '!',
            '° ͜ʖ ͡°': 'undefined',
            'ಠ_ಠ': 'null',
            nil: 'null',
            ':^)': 'NaN'
        }[operator] || operator;
    };

    makeVariable = (function(lastID, map) {
        return function(v) {
            if (!map.has(v)) {
                map.set(v, ++lastID);
            }
            return '_v' + map.get(v);
        };
    })(0, new HashMap());

    generate = function(e) {
        return generator[e.constructor.name](e);
    }

    generator = {
        Program: function(program) {
            indentLevel = 0;
            emit('function() {');
            generate(program.block);
            return emit('}())');
        },

        Block: function(block) {
            var i, len, ref, statement;
            indentLevel += 1;
            ref = block.statements;
            for (i = 0, len = ref.length; i < len; i++) {
                statement = ref[i];
                generate(statement);
            }
            return indentLevel--;
        },

        VariableDeclaration: function(variable) {
            var initializer = {
                'int': '0',
                'bool': 'false',
                'String': '',
                'float': '0.0',
                list: '[]',
                tuple: '[]',
                dict: '{}'
            }[variable.type];
            return emit("var " + (makeVariable(variable)) + " = " + (generate(variable.value) || initializer) + ";");
        },

        AssignmentStatement: function(statement) {
            return emit((generate(statement.target)) + " = " + (generate(statement.source)) + ";");
        },

        ReadStatement: function(statement) {
            var i, len, ref, results, v;
            ref = statement.varrefs;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                v = ref[i];

                results.push(emit((makeVariable(v.referent)) + " = prompt();"))
            }
            return results;
        },

        WriteStatement: function(s) {
            var e, i, len, ref, results;
            ref = s.expressions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                e = ref[i];
                results.push(emit("alert(" + (generate(e)) + ");"));
            }
            return results;
        },

        WhileStatement: function(s) {
            emit("while (" + (generate(s.condition)) + ") {");
            generate(s.body);
            return emit('}');
        },

        IfStatement: function(s) {
            emit("if (" + (generate(s.condition)) + ") {");
            generate(s.body);
            return emit('}');
        },


        ReturnStatement: function(s) {
            return "return";
        },

        IntegerLiteral: function(literal) {
            return literal.toString();
        },

        BooleanLiteral: function(literal) {
            return literal.toString();
        },

        StringLiteral: function(literal) {
            return '"' + literal.toString() + '"';
        },

        DictLiteral: function(literal) {
            return '{' + literal.items + '}';
        },

        NaNLiteral: function(literal) {
            return literal.toString;
        },

        VariableReference: function(v) {
            return makeVariable(v.referent);
        },

        UnaryExpression: function(e) {
            return "(" + (makeOperator(e.op.lexeme)) + " " + (generate(e.right)) + ")";
        },

        BinaryExpression: function(e) {
            return "(" + (generate(e.left)) + " " + (makeOperator(e.op.lexeme)) + " " + (generate(e.right)) + ")";
        }

    };



    // generator = function (program) {
    // 	this.indentLevel = 0;

    // }

    // Generator.prototype.generateBlock = function (block) {
    // 	this.indentLevel += 1;

    // 	for each (statement in block.statements) {
    // 		generateStatements(statement);
    // 	}

    // 	this.indentLevel -= 1;
    // }

    // Generator.prototype.generateStatement (statement) {

    // }

    // Generator.prototype.generate = function (program) {
    // 	emit("(function() {");
    // 	generateBlock(program.getBlock());
    // 	emit("}())");
    // }

    // Generator.prototype.synchronized = function (entity) {

    // }

    // Generator.prototype.emit = function (line) {
    // 	pad = indentPadding * this.indentLevel;

    // 	if (pad == 0) {
    // 		console.log(line);
    // 	} else {
    // 		console.log(" ".repeat(pad) + line);
    // 	}
    // }


}());