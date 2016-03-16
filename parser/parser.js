var AssignmentStatement = require('../entities/assignment-statement'),
    BinaryExpression = require('../entities/binary-expression'),
    Block = require('../entities/block'),
    BooleanLiteral = require('../entities/boolean-literal'),
    IntegerLiteral = require('../entities/integer-literal'),
    Program = require('../entities/program'),
    ReadStatement = require('../entities/read-statement'),
    Type = require('../entities/type'),
    UnaryExpression = require('../entities/unary-expression'),
    VariableDeclaration = require('../entities/variable-declaration'),
    VariableReference = require('../entities/variable-reference'),
    WhileStatement = require('../entities/while-statement'),
    WriteStatement = require('../entities/write-statement'),

    error = require('../error/error'),
    scanner = require('../scanner/scanner'),
    tokens = [];

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
        var source, target;
        target = new VariableReference(match('id'));
        match('=');
        source = parseExpression();
        return new AssignmentStatement(target, source);
    },

    parseBlock = function() {
        var statements;
        statements = [];
        while (true) {
            statements.push(parseStatement());
            match(';');
            if (!at(['var', 'id', 'read', 'write', 'while'])) {
                break;
            }
        }
        return new Block(statements);
    },

    parseExp1 = function() {
        var left, op, right;
        left = parseExp2();
        while (at('and')) {
            op = match();
            right = parseExp2();
            left = new BinaryExpression(op, left, right);
        }
        return left;
    },

    parseExp2 = function() {
        var left, op, right;
        left = parseExp3();
        if (at(['<', '<=', '==', '!=', '>=', '>'])) {
            op = match();
            right = parseExp3();
            left = new BinaryExpression(op, left, right);
        }
        return left;
    },

    parseExp3 = function() {
        var left, op, right;
        left = parseExp4();
        while (at(['+', '-'])) {
            op = match();
            right = parseExp4();
            left = new BinaryExpression(op, left, right);
        }
        return left;
    },

    parseExp4 = function() {
        var left, op, right;
        left = parseExp5();
        while (at(['*', '/'])) {
            op = match();
            right = parseExp5();
            left = new BinaryExpression(op, left, right);
        }
        return left;
    },

    parseExp5 = function() {
        var op, operand;
        if (at(['-', 'not'])) {
            op = match();
            operand = parseExp6();
            return new UnaryExpression(op, operand);
        } else {
            return parseExp6();
        }
    },

    parseExp6 = function() {
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

    parseExpression = function() {
        var left, op, right;
        left = parseExp1();
        while (at('or')) {
            op = match();
            right = parseExp1();
            left = new BinaryExpression(op, left, right);
        }
        return left;
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
        if (at('var')) {
            return parseVariableDeclaration();
        } else if (at('id')) {
            return parseAssignmentStatement();
        } else if (at('read')) {
            return parseReadStatement();
        } else if (at('write')) {
            return parseWriteStatement();
        } else if (at('while')) {
            return parseWhileStatement();
        } else {
            return error('Statement expected', tokens[0]);
        }
    },

    parseType = function() {
        if (at(['int', 'bool'])) {
            return Type.forName(match().lexeme);
        } else {
            return error('Type expected', tokens[0]);
        }
    },

    parseVariableDeclaration = function() {
        var id, type;
        match('var');
        id = match('id');
        match(':');
        type = parseType();
        return new VariableDeclaration(id, type);
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

module.exports = function(scannerOutput) {
    var program = parseProgram();
    tokens = scannerOutput;
    match('EOF');
    return program;
};