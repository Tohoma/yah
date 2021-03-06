(function() {

    var Args = require('../entities/args.js'),
        AssignmentStatement = require('../entities/assignment-statement'),
        Binding = require('../entities/binding'),
        BindList = require('../entities/bind-list'),
        BinaryExpression = require('../entities/binary-expression'),
        Block = require('../entities/block'),
        BooleanLiteral = require('../entities/boolean-literal'),
        Class = require('../entities/class-expression'),
        Comprehension = require('../entities/comprehension'),
        DictLiteral = require('../entities/dict-literal'),
        ExpList = require('../entities/expression-list'),
        FieldAccess = require('../entities/field-access'),
        Func = require('../entities/function'),
        FunctionCall = require('../entities/function-call'),
        ForStatement = require('../entities/for-statement'),
        FloatLiteral = require('../entities/float-literal'),
        IfStatement = require('../entities/if-statement'),
        IfElseStatement = require('../entities/if-else-statement'),
        IntegerLiteral = require('../entities/integer-literal'),
        ListLiteral = require('../entities/list-literal'),
        NaNLiteral = require('../entities/nan-literal'),
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

        ERROR = {},
        error = require('../error/error'),
        // error = function() { tokens = []; errHold(); return ERROR; },
        scan = require('../scanner/scanner'),
        tokens = [],
        reserved_tokens = ['id', 'is', 'be', 'intlit', 'newline',
                    'if', 'while', 'yah', 'nah', 'true',
                    'false', 'spit', 'return', '==', '>',
                    '<', '>=', '<=', 'or', '||', 'strlit',
                    'and', '&&', '!', 'not', '-',
                    '^', '**', 'for', 'INDENT',
                    'DEDENT', '.', '..', '...', '(', ')',
                    '[', ']', '{', '}', 'dict', 'tuple',
                    'list', 'string', 'float', 'nil',
                    'undefined', 'NaN', 'for',
                    'in', 'class', 'new', 'times', 'each'],

        type_tokens = ['int', 'string', 'float', 'bool', 'list',
                    'tuple', 'dict'];

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
            left = parseVarExp();
            match('be');
            exp = parseExpression();
            return new AssignmentStatement(left, exp);
        },

        parseBlock = function() {
            var statements = [];
            while (at(reserved_tokens) && !at('EOF')) {
                if (at(['INDENT', 'newline'])) {
                    match();
                } else {
                    if (at(['DEDENT'])) {
                        match();
                        break;
                    }
                    statements.push(parseStatement());
                }
            }
            return new Block(statements);
        },

        // parseClassExp = function() {
        //     match('class');
        //     match('->');
        //     match('newline');
        //     match('INDENT');
        //     var exp = parseExpression();
        //     match('newline');
        //     return new Class(exp);
        // },

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
            var left, op, right, inc;
            left = parseExp4();
            if (at(['..', '...'])) {
                op = match();
                right = parseExp4();
                if (at('by')) {
                    match();
                    inc = parseExp4();
                }
                left = new Comprehension(left, op, right, inc);
            }
            return left;
        },

        parseExp4 = function() {
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
            var left, op, right;
            left = parseExp8();
            if (at(['^', '**'])) {
                op = match();
                right = parseExp8();
                left = new BinaryExpression(op, left, right);
            }
            return left;
        },

        parseExp8 = function() {
            var left, right;
            left = parseExp9();
            while (at(['.', '[', '('])) {
                if (at('.')) {
                    match();
                    right = parseExp9();
                    left = new FieldAccess(left, right);
                } else if (at('[')) {
                    match();
                    right = parseExp3();
                    match(']');
                    left = new FieldAccess(left, right);
                } else {
                    right = parseArgs();
                    left = new FunctionCall(left, right);
                }

            }
            return left;
        },

        parseExp9 = function() {
            if (at('id')) {
                var id = match();
                if (at('::')) {
                    parseType();
                }
                return new VariableReference(id);
            } else if (at(['yah', 'nah', 'true', 'false'])) {
                return new BooleanLiteral(match());
            } else if (at('nil')) {
                return new NilLiteral(match());
            } else if (at('intlit')) {
                return new IntegerLiteral(match());
            } else if (at('floatlit')) {
                return new FloatLiteral(match());
            } else if (at('strlit')) {
                return new StringLiteral(match());
            } else if (at('undefined')) {
                return new UndefinedLiteral(match());
            } else if (at('NaN')) {
                return new NaNLiteral(match());
            } else if (at('[')) {
                return parseListLit();
            } else if (at('{')) {
                return parseDictLit();
            } else if (at('(')) {
                var t = copyTokens();
                match('(');
                if (!at(')')) {
                    var exp = parseExpression();
                } else {
                    match(')');
                    if (at('->')) {
                        tokens = t;
                        return parseFunction();
                    }
                    tokens = t;
                    return parseTupLit();
                }

                if (at(',')) {
                    tokens = t;
                    return parseTupLit();
                }
                match(')');
                return exp;
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
            return new Program(parseBlock());
        },

        parseExpression = function() {
            if (at('if')) {
                return parseConditionalExp();
            } else {
                var t = copyTokens();
                var exp = parseTernaryExp();
                if (at('is')) {
                    tokens = t;
                    return parseVariableDeclaration();
                } else if (at('be')) {
                    tokens = t;
                    return parseAssignmentStatement();
                } else if (at('->')) {
                    tokens = t;
                    return parseFunction();
                } else if (at(['.', '[', '('])) {
                    tokens = t;
                    return parseVarExp();
                }
                return exp;
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
                id = match('id');
                match('in');
                if (each) {
                    iterable = parseExp9();
                } else if (at('(')) {
                    match();
                    iterable = parseExpression();
                    match(')');
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

        parseListLit = function() {
            match('[');
            var expList = parseExpList();
            match(']');
            return new ListLiteral(expList);
        },

        parseTupLit = function() {
            match('(');
            var expList = parseExpList();
            match(')');
            return new TupleLiteral(expList);
        },

        parseType = function() {
            var type;
            match('::');
            if (at(type_tokens)) {
                type = match();
            } else {
                return error("Invalid type");
            }

            if (type.kind === 'int') {
                return Type.INT;
            } else if (type.kind === 'bool') {
                return Type.BOOL;
            } else if (type.kind === 'list') {
                return Type.LIST;
            } else if (type.kind === 'string') {
                return Type.STR;
            } else if (type.kind === 'float') {
                return Type.FLOAT;
            } else if (type.kind === 'tuple') {
                return Type.TUPLE;
            } else {
                return Type.DICT;
            }
        },

        parseDictLit = function() {
            match('{');
            var bindList = parseBindList();
            match('}');
            return new DictLiteral(bindList);
        },

        parseFunction = function() {
            var body, args;
            args = parseArgs();
            match('->');
            body = parseBlockOrStatement();
            return new Func(args, body);
        },

        copyTokens = function() {
            var copyTokens = [];
            tokens.forEach(function(token) {
                copyTokens.push(token);
            });
            return copyTokens;
        },


        parseExpList = function() {
            removeDentAndNewlineTokens();
            var expListItems = [];
            removeDentAndNewlineTokens();
            if (!at([']', ')'])) {
                expListItems.push(parseExpression());
            }
            while (at(',')) {
                match();
                removeDentAndNewlineTokens();
                expListItems.push(parseExpression());
            }
            removeDentAndNewlineTokens();
            return new ExpList(expListItems);
        },

        parseReturnStatement = function() {
            var exp,
                parens = []; // TODO: for potentially returning an object, we need to check for ({})
            match(); // TODO2: for when returning nothing
            exp = parseTernaryExp();
            return new ReturnStatement(exp);
        },

        parseBind = function() {
            removeDentAndNewlineTokens();
            var id = match();
            match(':');
            var exp = parseExpression();
            removeDentAndNewlineTokens();
            return new Binding(id, exp);
        },

        parseBindList = function() {
            removeDentAndNewlineTokens();
            var bindings = [];
            if (!at('}')) {
                bindings.push(parseBind());
            }
            while (at(',')) {
                match();
                removeDentAndNewlineTokens();
                bindings.push(parseBind());
            }
            removeDentAndNewlineTokens();
            return new BindList(bindings);
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
            if (at('::')) {
                type = parseType();
            }
            if (at('newline')) {
                match();
            } else {
                match('is');
                exp = parseExpression();
            }
            return new VariableDeclaration(id, exp, type);
        },

        parseVarExp = function() {
            var id = parseExp9(),
                field;

            while (at(['.', '[', '('])) {
                if (at('.')) {
                    match();
                    field = parseExp8();
                    id = new FieldAccess(id, field);
                } else if ('[') {
                    match();
                    field = parseExp3();
                    match(']');
                    id = new FieldAccess(id, field);
                } else {
                    field = parseArgs();
                    id = new FunctionCall(id, field);
                    return parseVarExp();
                }
            }
            return id;
        },

        parseArgs = function() {
            match('(');
            var args = parseExpList();
            match(')');
            return new Args(args);
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