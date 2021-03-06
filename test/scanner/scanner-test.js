var scan = require('../../scanner/scanner'),
    should = require('should'),
    error = require('../../error/error.js'),
    tokenList = require('./expected/outputs.js');

describe('The scanner', function() {
    it('scans the empty file and gives an EOF token', function(done) {
        var priorErrorCount = error.count;
        scan('./test/scanner/inputs/valid/empty-file.yah', function(tokens) {
            var expectedTokens = tokenList.empty_tokens;
            tokens.should.eql(expectedTokens);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('scans the valid sample1.yah file and gives an array of objects that match sample1_tokens', function(done) {
        var priorErrorCount = error.count;
        scan('./test/scanner/inputs/valid/sample1.yah', function(tokens) {
            var expectedTokens = tokenList.sample1_tokens;
            tokens.should.eql(expectedTokens);
            error.count.should.be.eql(priorErrorCount);
            done();
        })
    });

    it('scans multiplededents', function(done) {
        var priorErrorCount = error.count;
        scan('./test/scanner/inputs/valid/multiple-dedents.yah', function(tokens) {
            var expectedTokens = tokenList.multiplededents;
            tokens.should.eql(expectedTokens);
            error.count.should.be.eql(priorErrorCount);
            done();
        })
    });

    it('scans the invalid sample1.yah file', function(done) {
        var priorErrorCount = error.count;
        scan('./test/scanner/inputs/invalid/sample1.yah', function(tokens) {
            error.count.should.be.above(priorErrorCount);
            done();
        })
    });
});