var scan = require('../../scanner/scanner');
var should = require('should');
var assert = require('assert');

describe('The scanner', function() {
    it('scans the empty file', function(done) {
        scan('test/scanner/inputs/empty-file.yah', function(tokens) {
            tokens.length.should.equal(1);

            done();
        })
    });

    it('scans sample1.yah file', function(done) {
        scan('test/scanner/inputs/sample1.yah', function(tokens) {
            //TODO
            done();
        })
    });

    it('scans stest1.yah file', function(done) {
        scan('test/scanner/inputs/stest1.yah', function(tokens) {
            //TODO
            done();
        })
    })
});