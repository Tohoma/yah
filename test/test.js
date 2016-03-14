var assert = require('assert');
scan('../../tests/scanner/inputs/empty-file.yah', function (tokens) {
	console.log("Hello");
	console.log(tokens);
});
describe('Array', function() {
	console.log("Nope");
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      console.log("Hey");
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});