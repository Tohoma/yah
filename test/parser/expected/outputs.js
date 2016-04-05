var astList = {},

    testASTs = function() {

        astList.simple_declaration = "(Program (Block (is (x 3)) (is (y yah)) (is (trix 4kdz)) (is (a nil))))";
        astList.simple_assignment = "(Program (Block (is (x 3)) (be (x 10))))";
        astList.simple_if_else = "(Program (Block (If yah (Block (be (x 0))) Else (Block (Return trixr4kdz)))))";
        astList.simple_while = "(Program (Block (While (nah) (Block (be (you yah))))))";
        astList.expressions = "(Program (Block (or yah nah) (and yah nah) (|| yah nah) (&& yah nah)))"

        return astList;
    }();

module.exports = testASTs;