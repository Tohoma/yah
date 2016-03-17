var AssignmentStatement = require('../../entities/assignment-statement'),
    BinaryExpression = require('../../entities/binary-expression'),
    Block = require('../../entities/block'),
    BooleanLiteral = require('../../entities/boolean-literal'),
    FloatLiteral = require('../../entities/float-literal'),
    IntegerLiteral = require('../../entities/integer-literal'),
    NanLiteral = require('../../entities/nan-literal'),
    NilLiteral = require('../../entities/nil-literal'),
    Program = require('../../entities/program'),
    ReadStatement = require('../../entities/read-statement'),
    StringLiteral = require('../../entities/string-literal'),
    Type = require('../../entities/type'),
    UnaryExpression = require('../../entities/unary-expression'),
    UndefinedLiteral = require('../../entities/undefined-literal'),
    VariableDeclaration = require('../../entities/variable-declaration'),
    VariableReference = require('../../entities/variable-reference'),
    WhileStatement = require('../../entities/while-statement'),
    WriteStatement = require('../../entities/write-statement');

describe('The entities are:', function() {
    describe('assignment-statement', function() {
        it('successfully creates an assignment statement', function(done) {
            var newAssignment = new AssignmentStatement('x', '3');
            newAssignment.toString().should.eql('(be x 3)');
            done();
        });
    });

    // describe('binary-expression', function () {
    //     it('successfully creates a binary-expression', function (done) {
    //         var newBinExp = new BinaryExpression ('+', '2', '3');
    //         newBinExp.toString().should.eql('(+ 2 3)');
    //         done();
    //     });
    // });

    describe('block', function() {
        it('successfully creates a block', function(done) {
            var newBlock = new Block(['statement']);
            newBlock.toString().should.eql('(Block statement)');
            done();
        });
    });

    describe('boolean-literal', function() {
        it('successfully creates a boolean-literal', function(done) {
            var newBoolLit = new BooleanLiteral({
                'lexeme': 'yah'
            });
            newBoolLit.toString().should.eql('yah');
            done();
        });
    });

    // describe('function', function() {
    //     it('successfully creates a function', function(done) {
    //         done();
    //     });
    // });

    describe('float-literal', function() {
        it('successfully creates a float-literal', function(done) {
            var newFloatLit = new FloatLiteral({
                'lexeme': '3.1415926535'
            });
            newFloatLit.toString().should.eql('3.1415926535');
            done();
        });
    });

    describe('nan-literal', function() {
        it('successfully creates a nan-literal', function(done) {
            var newNanLit = new NanLiteral({
                'lexeme': 'nan'
            });
            newNanLit.toString().should.eql('nan');
            done();
        });
    });

    describe('nil-literal', function() {
        it('successfully creates a nil-literal', function(done) {
            var newFloatLit = new NilLiteral({
                'lexeme': 'nil'
            });
            newFloatLit.toString().should.eql('nil');
            done();
        });
    });

    // describe('for-statement', function() {
    //     it('successfully creates a for-statement', function(done) {
    //         // var newForStmt = new ForStatement ('i', '');
    //         done();
    //     });
    // });

    describe('integer-literal', function() {
        it('successfully creates an integer-literal', function(done) {
            var newIntLit = new IntegerLiteral('10000');
            newIntLit.toString().should.eql('10000');
            done();
        });
    });

    describe('program', function() {
        it('successfully creates a program', function(done) {
            var newProgram = new Program('block');
            newProgram.toString().should.eql('(Program block)');
            done();
        });
    });

    describe('string-literal', function() {
        it('successfully creates an string-literal', function(done) {
            var newStrLit = new StringLiteral({"lexeme":"stringy"});
            newStrLit.toString().should.eql("stringy");
            done();
        });
    });

    // describe('read-statement', function () {
    //     it('successfully creates read-statement', function (done) {

    //         done();
    //     });
    // });

    describe('type', function() {
        it('successfully creates an INT type', function(done) {
            Type.INT.toString().should.eql('int');
            done();
        });
        it('successfully creates a BOOL type', function(done) {
            Type.BOOL.toString().should.eql('bool');
            done();
        });
        it('successfully creates a STR type', function(done) {
            Type.STR.toString().should.eql('str');
            done();
        });
        it('successfully creates a FLOAT type', function(done) {
            Type.FLOAT.toString().should.eql('float');
            done();
        });
        it('successfully creates a UNDEFINED type', function(done) {
            Type.UNDEFINED.toString().should.eql('undefined');
            done();
        });
        it('successfully creates a NAN type', function(done) {
            Type.NAN.toString().should.eql('nan');
            done();
        });
        it('successfully creates a NIL type', function(done) {
            Type.NIL.toString().should.eql('nil');
            done();
        });
        it('successfully creates a LIST type', function(done) {
            Type.LIST.toString().should.eql('list');
            done();
        });
        it('successfully creates a TUPLE type', function(done) {
            Type.TUPLE.toString().should.eql('tuple');
            done();
        });
        it('successfully creates a DICT type', function(done) {
            Type.DICT.toString().should.eql('dict');
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

    describe('undefined-literal', function() {
        it('successfully creates a undefined-literal', function(done) {
            var newUndefinedLit = new UndefinedLiteral({
                'lexeme': 'undefined'
            });
            newUndefinedLit.toString().should.eql('undefined');
            done();
        });
    });

    describe('variable-declaration', function() {
        it('successfully creates a variable-declaration', function(done) {
            var newVarDec = new VariableDeclaration({
                "lexeme": 'x',
                "kind": 'id'
            }, '3');
            newVarDec.toString().should.eql('(VarDec (x 3))');
            done();
        });
    });

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