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

        WriteStatement: function(s) {
            var e, i, len, ref, results;
            ref = s.expressions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                e = ref[i];
                results.push(emit("console.log(" + (generate(e)) + ");"));
            }
            return results;
        },

        WhileStatement: function(s) {
            emit("while (" + (generate(s.condition)) + ") {");
            generate(s.body);
            return emit('}');
        },

        IfStatement: function(s) {
            emit("if (" + generate(s.condition) + ") {");
            generate(s.thenBody);
            return emit("}");
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
            return emit("}");
        },

        ForStatement: function(f) {
            emit("for ");
            console.log("TODO: Generator ForStatement")
            return emit("}");
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
            return '{' + literal.items.join(', ') + '}';
        },

        TupleLiteral: function(literal) {
            return '[' + literal.items.join(', ') + ']';
        },

        ListLiteral: function(literal) {
            return '[' + literal.items.join(', ') + ']';
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

        Function: function(f) {
            emit("function(" + generate(f.args) + ") {");
            return emit("}");
        },

        FunctionCall: function(f) {
            return f.id + "(" + f.args.join(", ") + ");";
        },

        FieldAccess: function(f) {
            //TODO
            return;
        },

        UnaryExpression: function(f) {
            //TODO
            return;
        },

        BinaryExpression: function(f) {
            //TODO
            return;
        },

        Print: function(s) {
            return "console.log(" + generate(s.exp) + ");";
        },

        ClassExpression: function(s) {
            //TODO
            return;
        },

        Comprehension: function(s) {
            //TODO
            return;
        },

        UndefLiteral: function(literal) {
            return literal.toString();
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