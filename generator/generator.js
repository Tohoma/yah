var Generator = (function () {

	generator = function (program, writer) {
		this.writer = writer;

		emit("(function() {");
		generateBlock(program.getBlock());
		emit("}())");
	}

	generate = function (program, writer) {

	}

	synchronized = function (entity) {

	}

	emit = function (line) {

	}


}());