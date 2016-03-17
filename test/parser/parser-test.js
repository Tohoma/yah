var scan = require('../../scanner/scanner'),
    should = require('should'),
    parse = require('../../parser/parser'),
    expected_ast = require('./expected/outputs.js');

describe('The parser', function() {
    it('parses correctly', function(done) {
        scan('./test/parser/inputs/valid/simple-assignment.yah', function(tokens) {
            var program = parse(tokens);
            program.toString().should.eql(expected_ast.simple_assignment);
            done();
        })
    });
});