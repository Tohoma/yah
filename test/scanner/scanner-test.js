var scan = require('../../scanner/scanner'),
    should = require('should'),
    error = require('../../error/error.js'),
    tokenList = require('./expected/outputs.js');

describe('The scanner', function() {
    it('scans the empty file and gives an EOF token', function(done) {
        scan('test/scanner/inputs/valid/empty-file.yah', function(tokens) {
            var priorErrorCount = error.count;
            var expectedTokens = tokenList.empty_tokens;
            tokens.should.eql(expectedTokens);
            error.count.should.be.eql(priorErrorCount);
            done();
        });
    });

    it('scans the valid sample1.yah file and gives an array of objects that match sample1_tokens', function(done) {
        scan('test/scanner/inputs/valid/sample1.yah', function(tokens) {
            var priorErrorCount = error.count;
            var expectedTokens = tokenList.sample1_tokens;
            tokens.should.eql(expectedTokens);
            error.count.should.be.eql(priorErrorCount);
            done();
        })
    });

    it('scans multiplededents', function(done) {
        scan('test/scanner/inputs/valid/multiple-dedents.yah', function(tokens) {
            var priorErrorCount = error.count;
            var expectedTokens = tokenList.multiplededents;
            tokens.should.eql(expectedTokens);
            error.count.should.be.eql(priorErrorCount);
            done();
        })
    });

    it('scans the invalid sample1.yah file', function(done) {
        scan('test/scanner/inputs/invalid/sample1.yah', function(tokens) {
            var priorErrorCount = error.count;
            error.count.should.be.eql(priorErrorCount);
            done();
        })
    });
});