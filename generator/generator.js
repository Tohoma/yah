var Generator = (function () {

	generator - function (name) {
		if ()
	}

	generator = function (program) {
		this.indentLevel = 0;

		emit("(function() {");
		generateBlock(program.getBlock());
		emit("}())");
	}

	Generator.prototype.generateBlock = function (block) {
		this.indentLevel += 1;

		for each (statement in block.statements) {
			generateStatements(statement);
		}

		this.indentLevel -= 1;
	}

	Generator.prototype.generateStatements (statement) {
		emit()
	}

	Generator.prototype.generate = function (program) {

	}

	Generator.prototype.synchronized = function (entity) {

	}

	Generator.prototype.emit = function (line) {
		pad = indentPadding * this.indentLevel;

		if (pad == 0) {
			console.log(line);
		} else {
			console.log(" ".repeat(pad) + line);
		}
	}


}());