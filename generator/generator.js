var Generator = (function() {

    var util = require('util');
    var HashMap = require('hashmap').HashMap;
    module.exports = function(program) {
        return generate(program);
    }

    indentPadding = 4;
    indentLevel = 0;

    var emit = function(line) {
        var pad;
        pad = indentPadding * indentLevel;
        console.log(Array(pad + 1).join(' ') + line);
        return;
    }

    var makeOperator = function(operator) {
        return {
            is: '=',
            be: '=',
            and: '&&',
            or: '||',
            eq: "===",
            "==": "===",
            "!=": "!==",
            neq: '!==',
            yah: 'true',
            nah: 'false',
            not: '!',
            '° ͜ʖ ͡°': 'undefined',
            'ಠ_ಠ': 'null',
            nil: 'null',
            ':^)': 'NaN'
        }[operator] || operator;
    };

    var makeVariable = (function(lastID, map) {
        return function(v) {
            if (!map.has(v)) {
                map.set(v, ++lastID);
            }
            return '_v' + map.get(v);
        };
    })(0, new HashMap());

    var generate = function(e) {
        return generator[e.constructor.name](e);
    }

    var generator = {
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
                int: '0',
                bool: 'false',
                string: '',
                float: '0.0',
                list: '[]',
                tuple: '[]',
                dict: '{}'
            }[variable.type];
            return emit("var " + (makeVariable(variable)) + " = " + (generate(variable.value) || initializer) + ";");
        },

        AssignmentStatement: function(statement) {
            return emit((generate(statement.target)) + " = " + (generate(statement.source)) + ";");
        },

        WriteStatement: function(s) {
            var e, i, len, ref, results;
            ref = s.expressions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                e = ref[i];
                results.push(emit("console.log(" + (generate(e)) + "); \n"));
            }
            return results;
        },

        WhileStatement: function(s) {
            emit("while (" + (generate(s.condition)) + ") {");
            generate(s.body);
            return emit("} \n");
        },

        IfStatement: function(s) {
            emit("if (" + generate(s.condition) + ") {");
            generate(s.thenBody);
            return emit("} \n");
        },

        IfElseStatement: function(s) {
            emit("if (" + generate(s.condition) + ") {");
            generate(s.thenBody);
            for (var i = 0; i < s.elseIfBody.length; i += 2) {
                emit("} else if (" + generate(s.elseIfBody[i]) + ") \{");
                generate(s.elseIfBody[i + 1]);
            }
            emit("} else {");
            generate(s.elseBody)
            return emit("} \n");
        },

        ForStatement: function(f) {
            emit("for ");
            console.log("TODO: Generator ForStatement")
            return emit("} \n");
        },

        ReturnStatement: function(s) {
            return emit("return " + generate(s.exp) + ";");
        },

        IntegerLiteral: function(literal) {
            return literal.toString();
        },

        BooleanLiteral: function(literal) {
            return literal.toString();
        },

        StringLiteral: function(literal) {
            return literal.toString();
        },

        DictLiteral: function(literal) {
            return '{' + literal.toString() + '}';
        },

        TupleLiteral: function(literal) {
            return '[' + literal.expList.items.join(', ') + ']';
        },

        ListLiteral: function(literal) {
            return literal.toString();
        },

        NaNLiteral: function(literal) {
            return literal.toString();
        },

        VariableReference: function(v) {
            return makeVariable(v.referent);
        },

        UnaryExpression: function(e) {
            return "(" + (makeOperator(e.op.lexeme)) + " " + (generate(e.right)) + ")";
        },

        BinaryExpression: function(e) {
            return "(" + (generate(e.left)) + " " + (makeOperator(e.op.lexeme)) + " " + (generate(e.right)) + ")";
        },

        FunctionStatement: function(f) {
            emit("function " + generate(f.args) + " {");
            generate(f.body);
            return emit("} \n");
        },

        FunctionCall: function(f) {
            return emit(generate(f.id) + "(" + generate(f.args) + "); \n");
        },

        Args: function(a) {
            return a.toString();
        },

        FieldAccess: function(f) {
            //TODO
            return;
        },

        Print: function(s) {
            return "console.log(" + generate(s.exp) + "); \n";
        },

        ClassExpression: function(s) {
            //TODO
            return;
        },

        Comprehension: function(s) {
            var result = [];
            for (var i = s.start; i < s.end; i+= s.inc) {
                result.push(i);
            }
            return result.join(', ');
        },

        UndefinedLiteral: function(literal) {
            return literal.toString();
        }
    };

}());