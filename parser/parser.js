var AssignmentStatement = require('../entities/assignment-statement'),
    BinaryExpression = require('../entities/binary-expression'),
    Block = require('../entities/block'),
    BooleanLiteral = require('../entities/boolean-literal'),
    FloatLiteral = require('../entities/float-literal'),
    IntegerLiteral = require('../entities/integer-literal'),
    NanLiteral = require('../entities/nan-literal'),
    NilLiteral = require('../entities/nil-literal'),
    Program = require('../entities/program'),
    ReadStatement = require('../entities/read-statement'),
    StringLiteral = require('../entities/string-literal'),
    Type = require('../entities/type'),
    UnaryExpression = require('../entities/unary-expression'),
    UndefinedLiteral = require('../entities/undefined-literal'),
    VariableDeclaration = require('../entities/variable-declaration'),
    VariableReference = require('../entities/variable-reference'),
    WhileStatement = require('../entities/while-statement'),
    WriteStatement = require('../entities/write-statement');

error = require('../error/error'),
    scan = require('../scanner/scanner'),
    tokens = [],

    error.quiet = true;

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
        if (at('id')) {
            id = match('id');
            match();
            exp = parseExpression();
            return new AssignmentStatement(left, exp);
        } else {
            return left;
        }
    },

    parseBlock = function() {
        var statements = [];
        while (at(['id', 'is', 'be', 'intlit', 'newline'])) {
            if (at('newline')) {
                match();
            } else {
                statements.push(parseStatement());
                match();
                if (at('EOF')) {
                    break;
                }
            }
        }
        return new Block(statements);
    },

    parseTernaryExp = function() { // Exp0 ('if' Exp0 ( 'else' TernaryExp)?)?
        var left, right, statement;
        left = parseExp0();
        if (at('if')) {
            match('if');
            // statement = left;
            // right = parseExp0();
        }
    },

    parseExp0 = function() {
        // console.log("Exp0");
        var left, op, right;
        left = parseExp1();
        while (at(['or', '||'])) { // Exp1 ('or' | '||' Exp1)*
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
        while (at(['and', '&&'])) { // Exp2 ('and' | '&&' Exp2)*
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
        if (at(['eq', 'neq', 'gt', 'lt', 'geq', 'leq'])) { // relop ('(' Exp3 (',' Exp3)+ ')' | Exp3 (',' Exp3)+) | Exp3
            op = match();
            right = parseExp3();
            left = new BinaryExpression(op, left, right);
        }
        return left;
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
        if (at(['-', 'not'])) {
            op = match();
            operand = parseExp7();
            return new UnaryExpression(op, operand);
        } else {
            return parseExp7();
        }
    },

    parseExp7 = function() { // Exp8 ('^' | '**' Exp8)?
        // console.log("Exp7");
        var left, op, right;
        left = parseExp9();     // Don't know how to do tuples for now so skip exp8
        if (at(['^', '**'])) {
            op = match();
            right = parseExp8();
            left = new BinaryExpression(op, left, right);
        } else {
            return left;
        }
    },

    // parseExp8 = function() { // Exp9 ('.' Exp9 | '[' Exp3 ']' | Args)*
    //     var expression = parseExp9();
    //     if (at(['.', '['])) {

    //     }

    // },

    parseExp9 = function() { // intlit | floatlit | boollit | id | '(' Exp ')' | stringlit
        // | undeflit | nanlit | nillit | ListLit | TupLit | DictLit
        // REMEMBER TO CHECK WHICH HAVE HIGHER PRECEDENCE
        // console.log("Exp9");
        if (at(['yah', 'nah'])) {
            return new BooleanLiteral(match());
        } else if (at('nil')) {
            return new NilLiteral(match());
        } else if (at('intlit')) {
            return new IntegerLiteral(tokens[0].lexeme);
        } else if (at('floatlit')) {
            return new FloatLiteral(match());
        } else if (at('strlit')) {
            return new StringLiteral(match());
        } else if (at('undeflit')) {
            return new UndefinedLiteral(match());
        } else if (at('nanlit')) {
            return new NaNLiteral(match());
        } else if (at('id')) {
            // console.log(tokens[0]);
            return new VariableReference(tokens[0]);
        } else if (at('[')) {
            // parseListLiteral();
            //} else if (at('(') && tokens[1].kind in types) { // Need to change this for Tuples to not use lookaheads
            // console.log("Found a tuple"); 
            // parseTupleLiteral();
        } else if (at('{')) {
            // parseDictLiteral();
        } else if (at('(')) {
            match();
            var expression = parseExpression();
            match(')');
            expression;
        } else {
            return error("Illegal start of expression", tokens[0]);
        }
    },

    parseExpression = function() {
        if (at('id')) {
            return parseVariableDeclaration();
        } else {
            return parseAssignmentStatement();
        }
    },

    parseIfElseStatement = function() {
        //TODO
    },

    parseProgram = function() {
        return new Program(parseBlock());
    },

    parseReadStatement = function() {
        var variables;
        match('read');
        variables = [];
        variables.push(new VariableReference(match('id')));
        while (at(',')) {
            match();
            variables.push(new VariableReference(match('id')));
        }
        return new ReadStatement(variables);
    },

    parseStatement = function() {
        // if (at('var')) {
        //     return parseVariableDeclaration();
        // } else 
        if (at('id')) {
            if (tokens[1].kind === 'is') {
                return parseVariableDeclaration();
            } else if (tokens[1].kind === 'be') {
                return parseAssignmentStatement();
            }
        }
        // else if (at('read')) {
        //     return parseReadStatement();
        // } else if (at('write')) {
        //     return parseWriteStatement();
        // } else if (at('while')) {
        //     return parseWhileStatement();
        else {
            return error('Statement expected', tokens[0]);
        }
        // else if (at('for')) {
        //     return parseForLoop();
        // } else if (at('while')) {
        //     return parseWhileLoop();
        // } else if (at('return')) {
        //     return parseReturnStatement();
        // } else {
        //     return parseExpression();
        // }
    },

    parseType = function() {
        if (at(['int', 'bool'])) {
            return Type.forName(match().lexeme);
        } else {
            return error('Type expected', tokens[0]);
        }
    },

    parseVariableDeclaration = function() {
        var id, exp;
        id = match('id');
        match('is');
        exp = parseExpression(); // need to generalize for the other expressions
        return new VariableDeclaration(id, exp);
    },

    parseWhileStatement = function() {
        var body, condition;
        match('while');
        condition = parseExpression();
        match('loop');
        body = parseBlock();
        match('end');
        return new WhileStatement(condition, body);
    },

    parseWriteStatement = function() {
        var expressions;
        match('write');
        expressions = [];
        expressions.push(parseExpression());
        while (at(',')) {
            match();
            expressions.push(parseExpression());
        }
        return new WriteStatement(expressions);
    };