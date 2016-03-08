var scan = require('../../scanner/scanner');
var should = require('should');
var assert = require('assert');

describe('The scanner', function () {
	it('scans the empty file', function (done) {
		scan('test/scanner/inputs/empty-file.yah', function(tokens) {
			tokens.length.should.equal(1);
			
			done();
		})
	});
});
