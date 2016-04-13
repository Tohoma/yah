var AssignmentStatement = require('../entities/assignment-statement'),
    BinaryExpression = require('../entities/binary-expression'),
    Block = require('../entities/block'),
    BooleanLiteral = require('../entities/boolean-literal'),
    DictLiteral = require('../entities/dict-literal'),
    FieldAccess = require('../entities/field-access'),
    Func = require('../entities/function'),
    FunctionCall = require('../entities/function-call'),
    ForStatement = require('../entities/for-statement'),
    FloatLiteral = require('../entities/float-literal'),
    IfElseStatement = require('../entities/if-else-statement'),
    IntegerLiteral = require('../entities/integer-literal'),
    ListLiteral = require('../entities/list-literal'),
    NanLiteral = require('../entities/nan-literal'),
    NilLiteral = require('../entities/nil-literal'),
    Program = require('../entities/program'),
    ReadStatement = require('../entities/read-statement'),
    ReturnStatement = require('../entities/return-statement'),
    StringLiteral = require('../entities/string-literal'),
    TernaryExp = require('../entities/string-literal'),
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
    items = [],         // ugh global. can't think of another way atm tho
    yah_tokens = ['id', 'is', 'be', 'intlit', 'newline',
                    'if', 'while', 'yah', 'nah', 'true',
                    'false', 'spit', 'eq', 'neq', 'gt',
                    'lt', 'geq', 'leq', 'or', '||',
                    'and', '&&', '!', 'not', '-',
                    '^', '**', '->', 'for', 'INDENT', 
                    'DEDENT', '.', '..', '...', '(', ')', 
                    '[', ']', '{', '}'];

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
        left = parseExp0();
        if (at('be')) {
            match();
            exp = parseExp0();
            return new AssignmentStatement(left, exp);
        } else {
            return left;
        }
    },

    parseBlock = function() {
        var statements = [];
        while (at(yah_tokens)) {
            if (at(['INDENT', 'newline'])) {
                match();
            } else {
                if (at('DEDENT')) {
                    match();
                    break;
                }
                console.log("WTF " + tokens[0].lexeme)
                statements.push(parseStatement());
                if (at('EOF')) {
                    break;
                }
            }
        }
        return new Block(statements);
    },

    //'if' Exp0 ':' newline Block (('else if' | 'elif') Exp0 ':' newline Block)* 
    // ('else:' newline Block)? | 'if' Exp0 ':' Exp

    parseConditionalExp = function() {
        var condition, thenBody, elseBody, elseifs;
        thenBody = [];
        elseifs = [];
        match('if');
        condition = parseExp0();
        match(':');
        thenBody.push(parseBlock());
        match('else');
        if (at('if')) {
            elseifs.push(parseConditionalExp());
        }
        match(':');
        elseBody = parseBlock();
        // console.log(elseBody);
        // will need to add for 'else if'
        return new IfElseStatement(condition, thenBody, elseBody);;
    },

    // parseTernaryExp = function() {
    //     var left, ifBody, elseBody;
    //     left = parseExp0();
    //     if (at('if')) {
    //         match();
    //         ifBody = parseExpression();
    //     }
    // },

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
        if (at(['eq', 'neq', 'gt', 'lt', 'geq', 'leq'])) { // relop ('(' Exp3 (',' Exp3)+ ')' | Exp3 (',' Exp3)+) | Exp3
            op = match();
            left = parseExp3();
            right = parseExp3();
            return new BinaryExpression(op, left, right);
        } else {
            return parseExp3();
        }
    },

    parseExp3 = function() {
        // console.log("Exp3");
        var left, op, right;
        left = parseExp4();
        if (at(['..', '...', 'by'])) { // Exp4 (('..' | '...') Exp4 ('by' Exp4)?)?
            op = match();
            right = parseExp4();
            left = new BinaryExpression(op, left, right);
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
        // console.log("Exp7(): " + JSON.stringify(tokens));
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

    parseExp8 = function() { // Exp9 ('.' Exp9 | '[' Exp3 ']' | Args)*
        // console.log("Exp8");
        var left, right;
        left = parseExp9();
        // console.log("left is " + left)
        while (at(['.', '[', '('])) {
            // console.log("INSIDE parseExp8")
            if (at ('.')) {
                // console.log("INSIDE parseExp8 @ .")
                // console.log(tokens[0].lexeme)
                match();
                // console.log(tokens[0].lexeme)
                right = parseExp9();
            } 
            if (at('[')) {
                match();
                right = parseExp3();
                match(']');
            } 
            if (at('(')) {
                match();
                right = parseExpList();
                match(')');
            }
            left = new FieldAccess(left, right);
        }
        return left;
    },

    parseExp9 = function() { // intlit | floatlit | boollit | id | '(' Exp ')' | stringlit
        // | undeflit | nanlit | nillit | ListLit | TupLit | DictLit
        // console.log("Exp9");
        console.log("WTF")
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
            console.log('parseExp9 ' + "wTF")
            return new VariableReference(match());
        // } else if (at('[')) {
        //     items = [];             // UUUGGGGHHHH Too much repetition HERE and...
        //     match();
        //     var expressionList = parseExpList();
        //     match(']');
        //     return new ListLiteral(expressionList);
        // }
        //  else if (at('{')) {
        //     items = [];             // here and ...
        //     match();
        //     var expressionList = parseExpList();
        //     match('}');
        //     return new DictLiteral(expressionList);
        // } else if (at('(')) {
        //     items = [];             // here :(
        //     match();
        //     var expressionList = parseExpList();
        //     match(')');
        //     if (at('->')) {
        //         return parseFunction();
        //     } else {
        //         return new TupleLiteral(expressionList);
        //     }
        // } 
        } else if (at(['[', '{', '('])) {
            items = [];
            var openGrouper = match().lexeme,
                expressionList = parseExpList();

            if (openGrouper === '[') {
                console.log(tokens[0].lexeme)
                console.log("I SHOULD BE HERE")
                match(']');
                console.log(tokens[0].lexeme)
                return new ListLiteral(expressionList);
            } else if (openGrouper === '{') {
                match('}');
                return new DictLiteral(expressionList);
            } else {
                match(')');
                if (at('->')) {
                    return parseFunction();
                } else {
                    return new TupleLiteral(expressionList);
                }
            }
        } else {
            return error("Illegal start of expression", tokens[0]);
        }
    },

    parseProgram = function() {
        return new Program(parseBlock());
    },

    parseExpression = function() {
        if (at('id')) {
            if (tokens[1].lexeme === 'is') {
                return parseVariableDeclaration();
            } else if (tokens[1].lexeme === 'be') {
                return parseAssignmentStatement();
            } else {
                return parseExp0();
            }
        } else if (at('if')) {
            return parseConditionalExp();
        } else if (at('->')) {
            return parseFunction();
        } else {
            return parseExp0();
        }
    },

    parseFor = function() {
        match('for');
        if (at('each')) {
            match('each');
        }
        var id = match(),
            iterable,
            body;
        match('in');
        if (at(['[', '('])) {
            iterable = parseExpList();
        }
        match(':');
        if (at('newline')) {
            body = parseBlock();
        } else {
            body = parseExpression(); 
        }
        return new ForStatement(id, iterable, body);
    },

    parseFunction = function() {
        var body, args;
        args = items;
        match('->');
        body = parseBlock();
        return new Func(args, body);
    },

    parseExpList = function() {
        items.push(parseExp0());
        while (at(',')) {
            match();
            items.push(parseExp0());
        }
        return items.join(', ');
    },

    parseReturnStatement = function() {
        var exp,
            parens = []; //for potentially returning an object, we need to check for ({})
        match();
        // if (at ('(')) {
        //     while(!(at(')'))) {

        //     }
        // } else {

        // }
        exp = parseExp0();
        return new ReturnStatement(exp);
    },

    parseStatement = function() {
        if (at('while')) {
            return parseWhileStatement();
        } else if (at('for')) {
            return parseFor();
        } else if (at(['return', 'spit'])) {
            return parseReturnStatement();
        } else {
            return parseExpression();
        }
    },

    parseVariableDeclaration = function() {
        var id, exp;
        id = match('id');
        match('is');
        exp = parseExp0();
        return new VariableDeclaration(id, exp);
    },

    parseWhileStatement = function() {
        var body, condition;
        match('while');
        condition = parseExp0();
        match(':');
        body = parseBlock();
        return new WhileStatement(condition, body);
    };