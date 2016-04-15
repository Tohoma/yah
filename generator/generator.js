var Generator = (function () {

	var util = require('util');
	var HashMap, = require('hashmap').HashMap;
	module.exports = fucntion(program) {
		return get(program)
	}

	indentPadding = 4;
	indentLevel = 0;

	var emit = function (line) {
		var pad;
		pad = indentPadding * indentLevel;
		return console.log(Array(pad + 1).join(' ') + line);
	}

	var makeOperator = function (operator) {
		return {
			is: '=',
			be: '=',
			and: '&&',
			or: '||',
			eq: "==",
			neq: '!=',
			// gt: '>',
			// lt: '<',
			// geq: '>=',
			// leq: '<=',
			yah: 'true',
			nah: 'false',
			not: '!'
		}[operator] || operator;
	};

	makeVariable = (function(lastID, map) {
		return function(v) {
			if(!map.has(v)) {
				map.set(v, ++lastID);
			}
			return '_v' + map.get(v);
		};
	})(0, new HashMap());

	gen = function(e) {
		return generator[e.constructor.name](e);
	}

	generator = {
		Program: function(program) {
			indentLevel = 0;
			emit('function() {');
			gen(program.block);
			return emit('}())');
		},

		Block: function(block) {
			var i, len, ref, statement;
			indentLevel += 1;
			ref = block.statements;
			for (i = 0, len = ref.length; i < len; i++) {
				statement = ref[i];
				gen(statement);
			}
			return indentLevel--;
		},

		VariableDeclaration: function(v) {
			var initializer = {
				'int': '0',
				'bool': 'false',
			}[v.type];
			return emit("var " + (makeVariable(v)) + " = " + initializer + ";");
		},

		AssignmentStatement: function (s) {
			return emit((gen(s.target)) + " = " + (gen(s.source)) + ";");
		},

		ReadStatement: function(s) {
			var i, len, ref, results, v;
			ref = s.varrefs;
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
				results.push(emit("alert(" + (gen(e)) + ");"));
			}
			return results;
		},

		WhileStatement: function(s) {
			emit("while (" + (gen(s.condition)) + ") {");
			gen(s.body);
			return emit('}');
		},

		IntegerLiteral: function(literal) {
			return literal.toString();
		},

		BooleanLiteral: function(literal) {
			return literal.toString();
		},

		VariableReference: function(v) {
			return makeVariable(v.referent);
		},

		UnaryExpression: function(e) {
			return "(" + (makeOperator(e.op.lexeme)) + " " + (gen(e.right)) + ")";
		},

		BinaryExpression: function(e) {
			return "(" + (gen(e.left)) + " " + (makeOperator(e.op.lexeme)) + " " + (gen(e.right)) + ")";
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