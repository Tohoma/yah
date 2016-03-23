var scan = require('../../scanner/scanner'),
    should = require('should'),
    parse = require('../../parser/parser'),
    expected_ast = require('./expected/outputs'),
    error = require('../../error/error');

describe('The parser', function() {
    it('parses the simple-declaration program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-declaration.yah', function(tokens) {
            var program = parse(tokens),
                priorErrorCount = error.count;

            program.toString().should.eql(expected_ast.simple_declaration);
            error.count.should.be.eql(0);
            done();
        });
    });
    it('parses the simple_assignment program correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-assignment.yah', function(tokens) {
            var program = parse(tokens),
                priorErrorCount = error.count;

            program.toString().should.eql(expected_ast.simple_assignment);
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