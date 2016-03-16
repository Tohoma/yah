var scan = require('../../scanner/scanner'),
    should = require('should'),
    tokenList = require('./expected/outputs.js');

describe('The scanner', function() {
    it('scans the empty file', function(done) {
        scan('test/scanner/inputs/valid/empty-file.yah', function(tokens) {
            var expectedTokens = tokenList.empty_tokens;
            tokens.should.eql(expectedTokens);
            done();
        })
    });

    it('scans sample1.yah file', function(done) {
        scan('test/scanner/inputs/valid/sample1.yah', function(tokens) {
            var expectedTokens = tokenList.sample1_tokens;
            tokens.should.eql(expectedTokens);
            done();
        })
    });

    it('scans the invalid sample1.yah file', function(done) {
        scan('test/scanner/inputs/invalid/sample1.yah', function(tokens) {
            //TODO
            done();
        })
    });
});