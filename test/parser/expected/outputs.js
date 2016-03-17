var astList = {},

    testASTs = function() {

        astList.simple_assignment = "(Program (Block (VarDec (x 3))))";

        return astList;
    }();

module.exports = testASTs;