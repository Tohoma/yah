var AssignmentStatement = require('../../entities/assignment-statement'),
    should = require("should");



describe('The optimizer', function() {
    describe('assignment-statement', function() {
        it('successfully creates an assignment statement', function(done) {
            var newAssignment = new AssignmentStatement('x', '3');
            newAssignment.toString().should.eql('(be (x 3))');
            done();
        });
    });
});