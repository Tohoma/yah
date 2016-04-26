var AssignmentStatement = require('../../entities/assignment-statement'),
    BinaryExpression = require('../../entities/binary-expression'),
    IntegerLiteral = require('../../entities/integer-literal'),
    BooleanLiteral = require('../../entities/boolean-literal'),
    should = require("should");

describe('The optimizer', function() {
    describe('binary-expressions', function() {
        it('successfully optimizes a binary addition expression', function(done) {
            var newBinaryAssignment = new BinaryExpression({
                'lexeme': '+',
                'kind': '+'
            }, new IntegerLiteral('3'), new IntegerLiteral('3'));
            newBinaryAssignment.optimize().toString().should.eql('6');
            done();
        });

        it('successfully optimizes a binary boolean expression', function(done) {
            var newBinaryAssignment = new BinaryExpression({
                'lexeme': '<=',
                'kind': '<='
            }, new IntegerLiteral('2123'), new IntegerLiteral('3222'));
            newBinaryAssignment.optimize().should.eql(true);
            done();
        });
    });

});