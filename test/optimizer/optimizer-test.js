var AssignmentStatement = require('../../entities/assignment-statement'),
    BinaryExpression = require('../../entities/binary-expression'),
    IntegerLiteral = require('../../entities/integer-literal'),
    BooleanLiteral = require('../../entities/boolean-literal'),
    StringLiteral = require('../../entities/string-literal'),
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

        it('successfully optimizes a binary boolean expression with IntegerLiterals', function(done) {
            var newBinaryAssignment = new BinaryExpression({
                'lexeme': '<=',
                'kind': '<='
            }, new IntegerLiteral('2123'), new IntegerLiteral('3222'));
            newBinaryAssignment.optimize().should.eql(true);
            done();
        });

        it('successfully optimizes a binary boolean expression with BooleanLiterals', function(done) {
            var newBinaryAssignment = new BinaryExpression({
                'lexeme': '==',
                'kind': '=='
            }, new BooleanLiteral('yah'), new BooleanLiteral('yah'));
            newBinaryAssignment.optimize().should.eql(true);
            done();
        });

        it('successfully optimizes a binary boolean expression with String * IntegeraLiteral', function(done) {
            var newBinaryAssignment = new BinaryExpression({
                'lexeme': '*',
                'kind': '*'
            }, new StringLiteral('yah'), new IntegerLiteral('3'));
            newBinaryAssignment.optimize().should.eql('yahyahyah');
            done();
        });
        it('successfully optimizes a binary boolean expression with String * IntegeraLiteral', function(done) {
            var newBinaryAssignment = new BinaryExpression({
                'lexeme': '*',
                'kind': '*'
            }, new IntegerLiteral('2'), new StringLiteral('nah'));
            newBinaryAssignment.optimize().should.eql('nahnah');
            done();
        });         
    });

});