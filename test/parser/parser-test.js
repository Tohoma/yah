var scan = require('../../scanner/scanner'),
    should = require('should'),
    parse = require('../../parser/parser'),
    expected_ast = require('./expected/outputs'),
    error = require('../../error/error');

describe('The parser', function() {
    it('parses the simple-declaration program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-declaration.yah', function(tokens) {
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_declaration);
            error.count.should.be.eql(0);
            done();
        });
    });

    it('parses the simple-assignment program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-assignment.yah', function(tokens) {
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_assignment);
            error.count.should.be.eql(0);
            done();
        });
    });

    it('parses the simple-if-else program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-if-else.yah', function(tokens) {
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_if_else);
            error.count.should.be.eql(0);
            done();
        });
    });

    it('parses the simple-while program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-while.yah', function(tokens) {
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_while);
            error.count.should.be.eql(0);
            done();
        });
    });

    // Watch out. Test has problems with synchronicity so when there are failing tests above, the below might give failures.
    it('parses the sample1.yah program correctly', function(done) {
        scan('./test/parser/inputs/valid/sample1.yah', function(tokens) {
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.sample1);
            error.count.should.be.eql(0);
            done();
        });
    });

    it('parses the field-access-test program correctly', function(done) {
        scan('./test/parser/inputs/valid/field-access-test.yah', function(tokens) {
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.field_access);
            error.count.should.be.eql(0);
            done();
        });
    });

    it('parses the expressions program correctly', function(done) {
        scan('./test/parser/inputs/valid/expressions.yah', function(tokens) {
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.expressions);
            error.count.should.be.eql(0);
            done();
        });
    });

    it.skip('parses the simple-for program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-for.yah', function(tokens) {
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_for);
            error.count.should.be.eql(0);
            done();
        });
    });

    it.skip('parses the simple-if-with-indents program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-if-with-indents.yah', function(tokens) {
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_if_with_indents);
            error.count.should.be.eql(0);
            done();
        });
    });

    it('throws an error when given syntactically incorrect program', function(done) {
        scan('./test/parser/inputs/invalid/bad-declaration.yah', function(tokens) {
            var priorErrorCount = error.count;
            parse(tokens);
            error.count.should.be.above(priorErrorCount);
            done();
        });
    });
});