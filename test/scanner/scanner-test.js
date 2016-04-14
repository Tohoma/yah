var scan = require('../../scanner/scanner'),
    should = require('should'),
    tokenList = require('./expected/outputs.js');
var assert = require('chai').assert;


var indentationError = function() {
    throw new Error("Indentation Error")
     scan('test/scanner/inputs/invalid/sample1.yah', function(err, tokens) {
                if (err) throw err
            })


}





describe('The scanner', function() {
    it('scans the empty file and gives an EOF token', function(done) {
        scan('test/scanner/inputs/valid/empty-file.yah', function(tokens) {
            var expectedTokens = tokenList.empty_tokens;
            tokens.should.eql(expectedTokens);
            done();
        });
    });

    it('scans sample1.yah file and gives an array of objects that match sample1_tokens', function(done) {
        scan('test/scanner/inputs/valid/sample1.yah', function(tokens) {
            var expectedTokens = tokenList.sample1_tokens;
            tokens.should.eql(expectedTokens);
            done();
        })
    });

    it('scans the invalid sample1.yah file', function(done) {
        // try {


        // } catch (err) {
        //     done();
        // }

        assert.throws(function() {
            indentationError()

        }, Error, "Indentation Error");
        done();

    });
});