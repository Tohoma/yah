var astList = {},

    testASTs = function() {

        astList.simple_declaration = "(Program (Block (is (x 3)) (is (y yah)) (is (trix 4kdz)) (is (a nil))))";
        astList.simple_assignment = "(Program (Block (is (x 3)) (be (x 10))))";

        return astList;
    }();

module.exports = testASTs;