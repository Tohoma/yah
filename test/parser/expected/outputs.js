var astList = {},

    testASTs = function() {

        astList.simple_assignment = "(Program (Block (VarDec (x 3)) (VarDec (y yah)) (VarDec (trix 4kdz)) (VarDec (a nil))))";

        return astList;
    }();

module.exports = testASTs;