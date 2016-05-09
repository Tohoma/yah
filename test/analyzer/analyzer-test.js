var scan = require('../../scanner/scanner'),
    should = require('should'),
    parse = require('../../parser/parser'),
    error = require('../../error/error');


describe('The analyzer', function() {
    //FAILING TEST SECTION!!!!!!!!!!!!!!!!!!!!!!!
    it('Analyzer detects Type Mismatch', function(done) {
        scan('./test/analyzer/inputs/invalid/type-mismatch.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(1);
            done();
        });
    });

    it('Analyzer detects Undeclared Variable', function(done) {
        scan('./test/analyzer/inputs/invalid/undeclared-variable.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(1);
            done();
        });
    });

    it('Analyzer detects Reserved Word misuse', function(done) {
        scan('./test/analyzer/inputs/invalid/reserved-word.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(1);
            done();
        });
    });

    it('Analyzer detects multiple Declarations', function(done) {
        scan('./test/analyzer/inputs/invalid/multi-decs.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(1);
            done();
        });
    });

    it('Analyzer detects Out of scope', function(done) {
        scan('./test/analyzer/inputs/invalid/out-of-scope.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(1);
            done();
        });
    });

    it.skip('Analyzer detects Parameter Mismatch', function(done) {
        scan('./test/analyzer/inputs/invalid/params-mismatch.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(1);
            done();
        });
    });
    // PASSING SECTION!!!!!!!!!!!!!!!!!!!!
    it('Analyzes no error Type Match', function(done) {
        scan('./test/analyzer/inputs/valid/good-type-match.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(0);
            done();
        });
    });

    it('Analyzes no error declared Variables', function(done) {
        scan('./test/analyzer/inputs/valid/good-declared-variables.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(0);
            done();
        });
    });

    it('Analyzes no error reserved usage', function(done) {
        scan('./test/analyzer/inputs/valid/good-reserved-word.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(0);
            done();
        });
    });

    it('Analyzes no error single delcartion in scope', function(done) {
        scan('./test/analyzer/inputs/valid/good-single-dec.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(0);
            done();
        });
    });

    it('Analyzes no error everything in scope', function(done) {
        scan('./test/analyzer/inputs/valid/good-scope.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(0);
            done();
        });
    });

    it('Analyzes no error parameter match', function(done) {
        scan('./test/analyzer/inputs/valid/good-parameter-match.yah', function(tokens) {
            error.count = 0;
            var program = parse(tokens);
            program.analyze();
            error.count.should.be.eql(0);
            done();
        });
    });
});