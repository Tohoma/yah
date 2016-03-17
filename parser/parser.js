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
    tokens = [];

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
        var source = parseExpression(),
            target = new VariableReference(match('id'));
        match('be');
        return new AssignmentStatement(target, source);
    },

    parseBlock = function() {
        var statements = [];
        while (at(['id', 'is', 'intlit', 'newline'])) {
            if (at('newline')) {
                match('newline');
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

    parseExp0 = function() {
        var left, op, right;
        left = parseExp1();
        while (at(['or', '||'])) { // Need to change this so we check if or is followed by valid expression
            op = match();
            right = parseExp1();
            left = new BinaryExpression(op, left, right);
        }
        return left;
    },

    parseExp1 = function() {
        var left, op, right;
        left = parseExp2();
        while (at(['and', '||'])) {
            op = match();
            right = parseExp2();
            left = new BinaryExpression(op, left, right);
        }
        return left;
    },

    parseExp2 = function() {
        var left, op, right;
        left = parseExp3();
        if (at(['<', '<=', '==', '!=', '>=', '>'])) { // relop ('(' Exp3 (',' Exp3)+ ')' | Exp3 (',' Exp3)+) | Exp3
            op = match();
            right = parseExp3();
            left = new BinaryExpression(op, left, right);
        }
        return left;
    },

    parseExp3 = function() {
        var left, op, right;
        left = parseExp4();
        while (at(['+', '-'])) { // Exp4 (('..' | '...') Exp4 ('by' Exp4)?)?
            op = match();
            right = parseExp4();
            left = new BinaryExpression(op, left, right);
        }
        return left;
    },

    parseExp4 = function() {
        var left, op, right;
        left = parseExp5();
        while (at(['*', '/'])) { // Exp5 (addop Exp4)*
            op = match();
            right = parseExp5();
            left = new BinaryExpression(op, left, right);
        }
        return left;
    },

    parseExp5 = function() {
        var op, operand;
        if (at(['-', 'not'])) { // Exp6 (mulop Exp5)*
            op = match();
            operand = parseExp6();
            return new UnaryExpression(op, operand);
        } else {
            return parseExp6();
        }
    },

    parseExp6 = function() { // prefixop? Exp7
        var expression;
        if (at(['true', 'false'])) {
            return new BooleanLiteral(match().lexeme);
        } else if (at('intlit')) {
            return new IntegerLiteral(match().lexeme);
        } else if (at('id')) {
            return new VariableReference(match());
        } else if (at('(')) {
            match();
            expression = parseExpression();
            match(')');
            return expression;
        } else {
            return error('Illegal start of expression', tokens[0]);
        }
    },

    parseExp7 = function() { // Exp8 ('^' | '**' Exp8)?

    },

    parseExp8 = function() { // Exp9 ('.' Exp9 | '[' Exp3 ']' | Args)*

    },

    parseExp9 = function() { // intlit | floatlit | boollit | id | '(' Exp ')' | stringlit
        // | undeflit | nanlit | nillit | ListLit | TupLit | DictLit
        var expression;

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
            return new VariableReference(match());
        } else if (at('[')) {
            // parseListLiteral();
        } else if (at('(') && tokens[1].kind in Type) { // Need to change this for Tuples 
            // parseTupleLiteral();
        } else if (at('{')) {
            // parseDictLiteral();
        } else if (at('(')) {
            match();
            expression = parseExpression();
            match(')');
            expression;
        } else {
            return error("Illegal start of expression", tokens[0]);
        }
    },

    parseExpression = function() {
        // var left, op, right;
        // left = parseExp1();
        // while (at('or')) {
        //     op = match();
        //     right = parseExp1();
        //     left = new BinaryExpression(op, left, right);
        // }
        // return left;
        // if (tokens[0].kind === 'is') {
        //     console.log("WAT")
        parseAssignmentStatement();
        // }
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
        match('is');                        // only works with assignments so far
        exp = parseExp9();                  // need to generalize it for the other expressions
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