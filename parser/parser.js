(function() {

    var AssignmentStatement = require('../entities/assignment-statement'),
        Binding = require('../entities/binding'),
        BinaryExpression = require('../entities/binary-expression'),
        Block = require('../entities/block'),
        BooleanLiteral = require('../entities/boolean-literal'),
        Comprehension = require('../entities/comprehension'),
        DictLiteral = require('../entities/dict-literal'),
        FieldAccess = require('../entities/field-access'),
        Func = require('../entities/function'),
        FunctionCall = require('../entities/function-call'),
        ForStatement = require('../entities/for-statement'),
        FloatLiteral = require('../entities/float-literal'),
        IfStatement = require('../entities/if-statement'),
        IfElseStatement = require('../entities/if-else-statement'),
        IntegerLiteral = require('../entities/integer-literal'),
        ListLiteral = require('../entities/list-literal'),
        NanLiteral = require('../entities/nan-literal'),
        NilLiteral = require('../entities/nil-literal'),
        Program = require('../entities/program'),
        ReadStatement = require('../entities/read-statement'),
        ReturnStatement = require('../entities/return-statement'),
        StringLiteral = require('../entities/string-literal'),
        Type = require('../entities/type'),
        TupleLiteral = require('../entities/tuple-literal'),
        UnaryExpression = require('../entities/unary-expression'),
        UndefinedLiteral = require('../entities/undefined-literal'),
        VariableDeclaration = require('../entities/variable-declaration'),
        VariableReference = require('../entities/variable-reference'),
        WhileStatement = require('../entities/while-statement'),
        WriteStatement = require('../entities/write-statement'),

        error = require('../error/error'),
        scan = require('../scanner/scanner'),
        tokens = [],
        expListItems = [], // ugh global. can't think of another way atm tho
        reserved_tokens = ['id', 'is', 'be', 'intlit', 'newline',
                    'if', 'while', 'yah', 'nah', 'true',
                    'false', 'spit', 'return', '==', '>',
                    '<', '>=', '<=', 'or', '||',
                    'and', '&&', '!', 'not', '-',
                    '^', '**', '->', 'for', 'INDENT',
                    'DEDENT', '.', '..', '...', '(', ')',
                    '[', ']', '{', '}', 'dict', 'tuple',
                    'list', 'string', 'float', 'nil',
                    'undefined', 'NaN', 'print', 'for',
                    'in', 'class', 'new', 'times', 'each'];

    // error.quiet = true;

    module.exports = function(scannerOutput) {
        tokens = scannerOutput;
        var program = parseProgram();
        match('EOF');
        return program;
    };

    var at = function(kind) {
            if (tokens.length === 0) {
                return false;
            } else if (Array.isArray(kind)) {
                return kind.some(at);
            } else {
                return kind === tokens[0].kind;
            }
        },

        match = function(kind) {
            if (tokens.length === 0) {
                return error('Unexpected end of source program');
            } else if (kind === void 0 || kind === tokens[0].kind) {
                return tokens.shift();
            } else {
                return error("Expected \"" + kind + "\" but found \"" + tokens[0].kind + "\"", tokens[0]);
            }
        },

        parseAssignmentStatement = function() {
            var left, exp;
            left = parseExp8();
            if (at('be')) {
                match();
                //console.log("parseAssignementStatement left is " +  left);

                exp = parseExpression();
                //console.log("parseAssignementStatement exp is " + exp);
                return new AssignmentStatement(left, exp);
            } else {
                return left;
            }
        },

        parseBlock = function() {
            var statements = [];
            while (at(reserved_tokens)) {
                if (at(['INDENT', 'newline'])) {
                    match();
                } else {
                    if (at(['DEDENT'])) {
                        match();
                        break;
                    }
                    statements.push(parseStatement());
                    if (at('EOF')) {
                        break;
                    }
                }
            }
            return new Block(statements);
        },

        parseClassExp = function() {
            //TODO
        },

        //'if' Exp0 ':' newline Block (('else if' | 'elif') Exp0 ':' newline Block)* 
        // ('else:' newline Block)? | 'if' Exp0 ':' Exp

        parseConditionalExp = function() {
            var condition, thenBody, elseBody, elseifs;
            elseifs = [];
            match('if');
            condition = parseExp0();
            match(':');
            thenBody = parseBlock();

            while (at('elif') || (at('else') && tokens[1].kind === 'if')) {
                match();
                if (at('if')) {
                    match();
                }
                elseifs.push(parseExp0());
                match(':');
                match('newline');
                elseifs.push(parseBlock());
            }

            if (at('else')) {
                match();
                match(':');
                elseBody = parseBlock();
            }

            return elseifs.length > 0 || elseBody ? new IfElseStatement(condition, thenBody, elseifs, elseBody) : new IfStatement(condition, thenBody);
        },

        parseTernaryExp = function() {
            // Functional now, but will need to optimize (if there's time)
            var left, middle, right;
            left = parseExp0();
            if (at('if')) {
                match();
                middle = parseExpression();
                if (at('else')) {
                    match();
                    right = parseExpression();
                }
                left = right ? new IfElseStatement(middle, left, [], right) : new IfStatement(middle, left);
            } else if (at('?')) {
                match();
                middle = parseExp0();
                match(':');
                right = parseExp0();

                left = right ? new IfElseStatement(left, middle, [], right) : new IfStatement(left, middle);
            }

            return left;
        },

        parseExp0 = function() {
            // console.log("Exp0");
            var left, op, right;
            left = parseExp1();
            while (at(['or', "||"])) {
                op = match();
                right = parseExp1();
                left = new BinaryExpression(op, left, right);
            }
            return left;
        },

        parseExp1 = function() {
            // console.log("Exp1");
            var left, op, right;
            left = parseExp2();
            while (at(['and', '&&'])) {
                op = match();
                right = parseExp2();
                left = new BinaryExpression(op, left, right);
            }
            return left;
        },

        parseExp2 = function() {
            // console.log("Exp2");
            var left, op, right;
            left = parseExp3();
            if (at(['==', '>', '<', '>=', '<='])) {
                op = match();
                right = parseExp3();
                left = new BinaryExpression(op, left, right);
            }
            return left;

        },

        parseExp3 = function() {
            // console.log("Exp3");
            var left, op, right, inc;
            left = parseExp4();
            if (at(['..', '...'])) {
                op = match();
                right = parseExp4();
                if (at('by')) {
                    match();
                    inc = parseExp4();
                }
                left = new Comprehension({start: left, operator: op, end:right, increment:inc, type:"other"});
            }
            return left;
        },

        parseExp4 = function() {
            // console.log("Exp4");
            var left, op, right;
            left = parseExp5();
            while (at(['+', '-'])) {
                op = match();
                right = parseExp5();
                left = new BinaryExpression(op, left, right);
            }
            return left;
        },

        parseExp5 = function() {
            // console.log("Exp5");
            var left, op, right;
            left = parseExp6();
            while (at(['*', '/'])) {
                op = match();
                right = parseExp6();
                left = new BinaryExpression(op, left, right);
            }
            return left;
        },

        parseExp6 = function() {
            // console.log("Exp6");
            var op, operand;
            if (at(['-', 'not', '!'])) {
                op = match();
                operand = parseExp7();
                return new UnaryExpression(op, operand);
            } else {
                return parseExp7();
            }
        },

        parseExp7 = function() {
            // console.log("Exp7");
            var left, op, right;
            left = parseExp8();
            if (at(['^', '**'])) {
                op = match();
                right = parseExp8();
                left = new BinaryExpression(op, left, right);
            }
            return left;
        },

        // The grammar for this looks exactly the same as VarExp
        parseExp8 = function() {
            // console.log("Exp8");
            var left, right;
            left = parseExp9();
            while (at(['.', '[', '('])) {
                if (at('.')) {
                    match();
                    right = parseExp9();
                } else if (at('[')) {
                    match();
                    right = parseExp3();
                    match(']');
                } else {
                    match('(');
                    expListItems = []; // Ugh, I need to optimize this too
                    while (at(['newline', 'INDENT', 'DEDENT'])) {
                        match();
                    }
                    right = parseExpList();
                    while (at(['newline', 'INDENT', 'DEDENT'])) {
                        match();
                    }
                    match(')');
                }
                left = new FieldAccess(left, right);
            }
            return left;
        },

        parseExp9 = function() { // intlit | floatlit | boollit | id | '(' Exp ')' | stringlit
            // | undeflit | nanlit | nillit | ListLit | TupLit | DictLit
            // console.log("Exp9");
            if (at(['yah', 'nah', 'true', 'false'])) {
                return new BooleanLiteral(match());
            } else if (at('nil')) {
                return new NilLiteral(match());
            } else if (at('intlit')) {
                return new IntegerLiteral(match().lexeme);
            } else if (at('floatlit')) {
                return new FloatLiteral(match());
            } else if (at('strlit')) {
                return new StringLiteral(match());
            } else if (at('undeflit')) {
                return new UndefinedLiteral(match());
            } else if (at('nanlit')) {
                return new NaNLiteral(match());
            } else if (at('id')) {
                return new VariableReference(match());
            } else if (at(['[', '('])) {

                // We might need to rethink allowing lists, tuples, and dicts to be multiline.
                // Removing the in-/de- dents and newlines work, but may not be optimal
                // CTRL+F "removeDentAndNewlineTokens();" to see where I placed them
                // if you want to delete them in case we think of a better way
                var copyTokens = [];
                var openGrouper = match().lexeme;
                tokens.forEach(function(token) { copyTokens.push(token) });
                parseExpression();
                if (at('for')) {
                    tokens = copyTokens;
                    var comp = parseComprehension();
                    match(']');
                    return comp;
                } else {
                    tokens = copyTokens;
                    expListItems = [];
                    // var openGrouper = match().lexeme;
                    var expressionList = parseExpList();
                    if (openGrouper === '[') {
                        match(']');
                        removeDentAndNewlineTokens();
                        return new ListLiteral(expressionList);
                    } else {
                        match(')');
                        removeDentAndNewlineTokens()
                        if (at('->')) {
                            return parseFunction();
                        } else {
                            return new TupleLiteral(expressionList);
                        }
                    }
                }

            } else if (at(['{'])) {
                match();
                var bindList = parseBind();
                match('}');
                removeDentAndNewlineTokens();
                return new DictLiteral(bindList);
            } else {
                return error("Illegal start of expression", tokens[0]);
            }
        },

        removeDentAndNewlineTokens = function() {
            while (at(['newline', 'INDENT', 'DEDENT'])) {
                match();
            }
        },

        parseBlockOrStatement = function() {
            var body;
            if (at('newline')) {
                body = parseBlock();
            } else {
                body = parseStatement();
            }
            return body;
        },

        parseProgram = function() {
            // console.log(JSON.stringify(tokens));
            return new Program(parseBlock());
        },

        parseExpression = function() {
            if (at('id')) {
                if (tokens[1].kind === 'is' || tokens[1].kind === ':') {
                    return parseVariableDeclaration();
                } else if (tokens[1].kind === 'be') {
                    return parseAssignmentStatement();
                } else {
                    return parseTernaryExp();
                }
            } else if (at('if')) {
                return parseConditionalExp();
            } else if (at('->')) {
                return parseFunction();
            } else {
                return parseTernaryExp();
            }
        },

        parseFor = function() {
            var id, iterable, body, each;
            if (at('for')) {
                match();
                if (at('each')) {
                    match();
                    each = true;
                }
                id = parseExp9();
                match('in');
                if (each) {
                    iterable = parseExp9();
                } else if (at('(')) {
                    match();
                    iterable = parseExpression();
                    match(')');
                } else {
                    iterable = parseExpression();
                }
                match(':');
                body = parseBlockOrStatement();

            } else {
                match('times');
                iterable = parseExp9();
                match(':');
                body = parseBlockOrStatement();
            }
            return new ForStatement(id, iterable, body);
        },

        parseFunction = function() {
            var body, args;
            args = expListItems;
            match('->');
            body = parseBlock();
            return new Func(args, body);
        },


        parseExpList = function() {
            removeDentAndNewlineTokens();
            if (at([']', ')'])) {
                expListItems = [];
            } else {
                expListItems.push(parseExpression());
            }
            while (at(',')) {
                match();
                removeDentAndNewlineTokens();
                expListItems.push(parseExpression());
            }
            removeDentAndNewlineTokens();
            return expListItems.join(', ');
        },

        parseReturnStatement = function() {
            var exp,
                parens = []; //TODO: for potentially returning an object, we need to check for ({})
            match();
            exp = parseTernaryExp();
            return new ReturnStatement(exp);
        },

        parseBindList = function() {
            removeDentAndNewlineTokens();
            var id = match('id').lexeme;
            match(':');
            var exp = parseExpression();
            removeDentAndNewlineTokens();
            return new Binding(id, exp);
        },

        parseBind = function() {
            removeDentAndNewlineTokens();
            var bindings = [];
            if (!at('}')) {
                bindings.push(parseBindList());
            }
            while (at(',')) {
                match();
                removeDentAndNewlineTokens();
                bindings.push(parseBindList());
            }
            removeDentAndNewlineTokens();
            return bindings.join(', ');
        },

        // May not work. Chris has to look at macrosyntax
        parseComprehension = function() {
            var tern = parseTernaryExp();
            match('for');
            if (at('each')) {
                match();
            }
            var id = match('id');
            match('in');
            var exp = parseExpression();
            var intlit;
            if (at('by')) {
                match();
                intlit = parseExp9();
            } 
            return new Comprehension({expression: tern, id:id, iterable:exp, increment:intlit, type:"for-in"});
        },

        parseStatement = function() {
            if (at('while')) {
                return parseWhileStatement();
            } else if (at(['for', 'times'])) {
                return parseFor();
            } else if (at(['return', 'spit'])) {
                return parseReturnStatement();
            } else {
                return parseExpression();
            }
        },

        parseVariableDeclaration = function() {
            var id, exp, type;
            id = match('id');
            if (at(':')) {
                match();
                type = match();
            }
            if (at('newline')) {
                match();
            } else {
                match('is');
                exp = parseTernaryExp();
            }
            return new VariableDeclaration(id, exp, type);
        },

        parseWhileStatement = function() {
            var body, condition;
            match('while');
            condition = parseExpression();
            match(':');
            body = parseBlockOrStatement();
            return new WhileStatement(condition, body);
        };
})();