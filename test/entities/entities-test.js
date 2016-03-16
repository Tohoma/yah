var AssignmentStatement = require('../../entities/assignment-statement'),
    BinaryExpression = require('../../entities/binary-expression'),
    Block = require('../../entities/block'),
    BooleanLiteral = require('../../entities/boolean-literal'),
    IntegerLiteral = require('../../entities/integer-literal'),
    Program = require('../../entities/program'),
    ReadStatement = require('../../entities/read-statement'),
    Type = require('../../entities/type'),
    UnaryExpression = require('../../entities/unary-expression'),
    VariableDeclaration = require('../../entities/variable-declaration'),
    VariableReference = require('../../entities/variable-reference'),
    WhileStatement = require('../../entities/while-statement'),
    WriteStatement = require('../../entities/write-statement');

describe('The entities:', function() {
    // describe('assignment-statement', function () {
    //     it('successfully creates an assignment statement', function(done) {

    //         done();
    //     });
    // });

    // describe('binary-expression', function () {
    //     it('successfully creates a binary-expression', function (done) {

    //         done();
    //     });
    // });

    describe('block', function () {
        it('successfully creates a block', function (done) {
            var newBlock = new Block (['statement']);
            newBlock.toString().should.eql('(Block statement)');
            done();
        });
    });

    // describe('boolean-literal', function () {
    //     it('successfully creates a boolean-literal', function (done) {

    //         done();
    //     });
    // });

    // describe('integer-literal', function () {
    //     it('successfully creates an integer-literal', function (done) {

    //         done();
    //     });
    // });

    describe('program', function () {
        it('successfully creates a program', function (done) {
            var newProgram = new Program ('block');
            newProgram.toString().should.eql('(Program block)');
            done();
        });
    });

    // describe('read-statement', function () {
    //     it('successfully creates read-statement', function (done) {

    //         done();
    //     });
    // });

    describe('type', function () {
        it('successfully creates an INT type', function(done){
            Type.INT.toString().should.eql('int');
            done();
        });
        it('successfully creates a BOOL type', function(done){
            Type.BOOL.toString().should.eql('bool');
            done();
        });
        it('successfully creates a STR type', function(done){
            Type.STR.toString().should.eql('str');
            done();
        });
        it('successfully creates an ARBITRARY type', function(done) {
            Type.ARBITRARY.toString().should.eql('<arbitrary_type>');
            done();
        })
    });

    // describe('unary-expression', function () {
    //     it('successfully creates a unary-expression', function(done){

    //         done();
    //     });
    // });

    // describe('variable-declaration', function () {
    //     it('successfully creates a variable-declaration', function(done){

    //         done();
    //     });
    // });

    // describe('variable-reference', function () {
    //     it('successfully creates a variable-reference', function(done){

    //         done();
    //     });
    // });

    // describe('while-statement', function () {
    //     it('successfully creates a while-statement', function(done){

    //         done();
    //     });
    // });

    // describe('write-statement', function () {
    //     it('successfully creates a write-statement', function(done){

    //         done();
    //     });
    // });

});