var AssignmentStatement = require('../../entities/assignment-statement'),
    BinaryExpression = require('../../entities/binary-expression'),
    IntegerLiteral = require('../../entities/integer-literal'),

    should = require("should");



describe('The optimizer', function() {
    describe('binary-expression', function() {
        it('successfully optimizes a binary expression', function(done) {
            var newBinaryAssignment = new BinaryExpression({
                'lexeme': '+',
                'kind': '+'
            }, new IntegerLiteral('3'), new IntegerLiteral('3'));
            newBinaryAssignment.optimize().toString().should.eql(6);;
            done();
        });
    });
});