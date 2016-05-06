var astList = {},

    testASTs = function() {

        astList.simple_declaration = "(Program (Block (is (x 3)) (is (y yah)) (is (trix 4kdz)) (is (a nil))))";
        astList.simple_assignment = "(Program (Block (is (x 3)) (be (x 10))))";
        astList.simple_if_else = "(Program (Block (If yah (Block (be (x 0))) Else (Block (Return trixr4kdz)))))";
        astList.simple_if_with_indents = "(Program (Block (If yah (Block (be (x yah)))) (be (x nah))))"
        astList.simple_while = "(Program (Block (While (nah) (Block (be (you yah))))))";
        astList.expressions = "(Program (Block (or yah nah) (and yah nah) (|| yah nah) (&& yah nah) (> 3 3) "
                                + "(+ (+ 5 10) 1) (/ 100 20) (! yah) (^ 4 2) (is (x [1,2,3])) (. (. x y) 2) "
                                + "(10 .. 40 by 2) (FunCall f (1, 2)) (While (yah) (Return x)) (Function (x) (Return x)) "
                                + "(. (FunCall id (arg, 1)) field)))";
        astList.sample1 = "(Program (Block (is (x (/ (* 3 4) 2))) (is (y yah)) (is (trix 4kdz)) "
                                + "(is (addOne (Function (p,q) (Block (Return (+ (+ p q) 1)))))) "
                                + "(is (l [1,2,x])) (is (t (a,y,trix))) (is (l2 [])) "
                                + "(is (z {})) (is (d {(: a 10),(: b 2),(: c 3)}))))";
        astList.simple_for = "(Program (Block (For i (0 .. 5 by 1) (Block (Return i))) "
                                + "(For i 3 (Block (Return WAT))) "
                                + "(For fruit basket (Block (Return fruit)))))";
        astList.else_if = "(Program (Block (If (> x 3) (Block (Return yah)) "
                                + "Elif (== x 3) (Block (Return 0)) Else (Block (Return nah))) "
                                + "(If yah (Block (Return 100)) Elif (> x 3) (Block (Return x)))))"
        astList.nested_if = "(Program (Block (If (> x 3) (Block (Return yah)) Elif (== x 3) (Block (If (< y 2) "
                                + "(Block (Return y)) Elif (> something 2) (Block (Return (- y))) Else "
                                + "(Block (Return 100)))) Else (Block (Return nah)))))";
        astList.tern_exp = "(Program (Block (If (== x y) yah) (If (== x y) yah Else nah) (If (> x 3) trix Else xirt)))"
        astList.primitives = "(Program (Block (is (a 2)) (is (b what)) (is (c yah)) (is (d nah)) (is (banana undefined)) "
                                + "(is (apple nil)) (is (orange NaN)) (is (h [1,2,3,4,5])) (is (i (1,2,3,4,5))) "
                                + "(is (j {(: 0 1),(: 2 3)})) (be ((. h 0) 6)) (be ((. i 0) 6)) (be ((. j 2) 5))))"

        return astList;
    }();

module.exports = testASTs;
