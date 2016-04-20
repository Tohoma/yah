var tokenList = {},

    testTokens = function() {

        tokenList.multiplededents = [
            {
                lexeme: 'if',
                kind: 'if',
                line: 1,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'yah',
                kind: 'yah',
                line: 1,
                col: 4,
                idLevel: 0
            },
            {
                lexeme: ':',
                kind: ':',
                line: 1,
                col: 7,
                idLevel:0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 1,
                col: 8,
                idLevel: 0
            },
            {
                lexeme: 'INDENT',
                kind: 'INDENT',
                line: 2,
                col: 4,
                idLevel: 3
            },
            {
                lexeme: 'if',
                kind: 'if',
                line: 2,
                col: 4,
                idLevel: 3
            },
            {
                lexeme: 'eq',
                kind: 'eq',
                line: 2,
                col: 7,
                idLevel: 3
            },
            {
                lexeme: 'x',
                kind: 'id',
                line: 2,
                col: 10,
                idLevel: 3
            },
            {
                lexeme: ',',
                kind: ',',
                line: 2,
                col: 11,
                idLevel: 3
            },
            {
                lexeme: '3',
                kind: 'intlit',
                line: 2,
                col: 12,
                idLevel: 3
            },
            {
                lexeme: ':',
                kind: ':',
                line: 2,
                col: 13,
                idLevel: 3
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 2,
                col: 14,
                idLevel: 3
            },
            {
                lexeme: 'INDENT',
                kind: 'INDENT',
                line: 3,
                col: 7,
                idLevel:6
            },
            {
                lexeme: 'spit',
                kind: 'spit',
                line: 3,
                col: 7,
                idLevel:6
            },
            {
                lexeme: 'yah',
                kind: 'yah',
                line: 3,
                col: 12,
                idLevel:6
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 3,
                col: 15,
                idLevel:6
            },
            {
                lexeme: 'DEDENT',
                kind: 'DEDENT',
                line: 4,
                col: 1,
                idLevel:0
            },
            {
                lexeme: 'DEDENT',
                kind: 'DEDENT',
                line: 4,
                col: 1,
                idLevel:0
            },
            {
                lexeme: 'x',
                kind: 'id',
                line: 4,
                col: 1,
                idLevel:0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 4,
                col: 3,
                idLevel:0
            },
             {
                lexeme: '5',
                kind: 'intlit',
                line: 4,
                col: 6,
                idLevel:0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 4,
                col: 7,
                idLevel: 0
            },
            {
                lexeme: 'EOF',
                kind: 'EOF'
            }
        ]

        tokenList.empty_tokens = [
            {
                lexeme: 'EOF',
                kind: 'EOF'
            }
        ]

        tokenList.sample1_tokens = [
            {
                lexeme: 'x',
                kind: 'id',
                line: 1,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 1,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: '3',
                kind: 'intlit',
                line: 1,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: '*',
                kind: '*',
                line: 1,
                col: 8,
                idLevel: 0
            },
            {
                lexeme: '4',
                kind: 'intlit',
                line: 1,
                col: 10,
                idLevel: 0
            },
            {
                lexeme: '/',
                kind: '/',
                line: 1,
                col: 12,
                idLevel: 0
            },
            {
                lexeme: '2',
                kind: 'intlit',
                line: 1,
                col: 14,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 1,
                col: 15,
                idLevel: 0
            },
            {
                lexeme: 'y',
                kind: 'id',
                line: 2,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 2,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: 'yah',
                kind: 'yah',
                line: 2,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 2,
                col: 9,
                idLevel: 0
            },
            {
                lexeme: 'trix',
                kind: 'id',
                line: 4,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 4,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: '4kdz',
                kind: 'strlit',
                line: 4,
                col: 9,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 4,
                col: 33,
                idLevel: 0
            },
            {
                lexeme: 'addOne',
                kind: 'id',
                line: 6,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 6,
                col: 8,
                idLevel: 0
            },
            {
                lexeme: '(',
                kind: '(',
                line: 6,
                col: 11,
                idLevel: 0
            },
            {
                lexeme: 'p',
                kind: 'id',
                line: 6,
                col: 12,
                idLevel: 0
            },
            {
                lexeme: ')',
                kind: ')',
                line: 6,
                col: 13,
                idLevel: 0
            },
            {
                lexeme: '->',
                kind: '->',
                line: 6,
                col: 15,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 6,
                col: 17,
                idLevel: 0
            },
            {
                lexeme: 'INDENT',
                kind: 'INDENT',
                line: 7,
                col: 3,
                idLevel: 2
            },
            {
                lexeme: 'spit',
                kind: 'spit',
                line: 7,
                col: 3,
                idLevel: 2
            },
            {
                lexeme: 'p',
                kind: 'id',
                line: 7,
                col: 8,
                idLevel: 2
            },
            {
                lexeme: '+',
                kind: '+',
                line: 7,
                col: 10,
                idLevel: 2
            },
            {
                lexeme: '1',
                kind: 'intlit',
                line: 7,
                col: 12,
                idLevel: 2
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 7,
                col: 13,
                idLevel: 2
            },
            {
                lexeme: 'DEDENT',
                kind: 'DEDENT',
                line: 9,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'a',
                kind: 'id',
                line: 9,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 9,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: 'nil',
                kind: 'nil',
                line: 9,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 9,
                col: 9,
                idLevel: 0
            },
            {
                lexeme: 'b',
                kind: 'id',
                line: 10,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 10,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: 'undefined',
                kind: 'undefined',
                line: 10,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 10,
                col: 15,
                idLevel: 0
            },
            {
                lexeme: 'c',
                kind: 'id',
                line: 11,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 11,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: 'NaN',
                kind: 'NaN',
                line: 11,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 11,
                col: 9,
                idLevel: 0
            },
            {
                lexeme: 'l',
                kind: 'id',
                line: 13,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 13,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: '[',
                kind: '[',
                line: 13,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: '1',
                kind: 'intlit',
                line: 13,
                col: 7,
                idLevel: 0
            },
            {
                lexeme: ',',
                kind: ',',
                line: 13,
                col: 8,
                idLevel: 0
            },
            {
                lexeme: '2',
                kind: 'intlit',
                line: 13,
                col: 9,
                idLevel: 0
            },
            {
                lexeme: ',',
                kind: ',',
                line: 13,
                col: 10,
                idLevel: 0
            },
            {
                lexeme: 'x',
                kind: 'id',
                line: 13,
                col: 11,
                idLevel: 0
            },
            {
                lexeme: ']',
                kind: ']',
                line: 13,
                col: 12,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 13,
                col: 13,
                idLevel: 0
            },
            {
                lexeme: 't',
                kind: 'id',
                line: 14,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 14,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: '(',
                kind: '(',
                line: 14,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: 'a',
                kind: 'id',
                line: 14,
                col: 7,
                idLevel: 0
            },
            {
                lexeme: ',',
                kind: ',',
                line: 14,
                col: 8,
                idLevel: 0
            },
            {
                lexeme: 'y',
                kind: 'id',
                line: 14,
                col: 9,
                idLevel: 0
            },
            {
                lexeme: ',',
                kind: ',',
                line: 14,
                col: 10,
                idLevel: 0
            },
            {
                lexeme: 'trix',
                kind: 'id',
                line: 14,
                col: 11,
                idLevel: 0
            },
            {
                lexeme: ')',
                kind: ')',
                line: 14,
                col: 15,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 14,
                col: 16,
                idLevel: 0
            },
            {
                lexeme: 'sample',
                kind: 'id',
                line: 16,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: '(',
                kind: '(',
                line: 16,
                col: 7,
                idLevel: 0
            },
            {
                lexeme: '(',
                kind: '(',
                line: 16,
                col: 8,
                idLevel: 0
            },
            {
                lexeme: 'x',
                kind: 'id',
                line: 16,
                col: 9,
                idLevel: 0
            },
            {
                lexeme: ')',
                kind: ')',
                line: 16,
                col: 10,
                idLevel: 0
            },
            {
                lexeme: '->',
                kind: '->',
                line: 16,
                col: 12,
                idLevel: 0
            },
            {
                lexeme: 'print',
                kind: 'print',
                line: 16,
                col: 15,
                idLevel: 0
            },
            {
                lexeme: '(',
                kind: '(',
                line: 16,
                col: 20,
                idLevel: 0
            },
            {
                lexeme: 'x',
                kind: 'id',
                line: 16,
                col: 21,
                idLevel: 0
            },
            {
                lexeme: ')',
                kind: ')',
                line: 16,
                col: 22,
                idLevel: 0
            },
            {
                lexeme: ')',
                kind: ')',
                line: 16,
                col: 23,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 16,
                col: 24,
                idLevel: 0
            },
            {
                lexeme: '!',
                kind: '!',
                line: 18,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'y',
                kind: 'id',
                line: 18,
                col: 2,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 18,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: 'x',
                kind: 'id',
                line: 19,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: '^',
                kind: '^',
                line: 19,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: '3',
                kind: 'intlit',
                line: 19,
                col: 5,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 19,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: 'z',
                kind: 'id',
                line: 20,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 20,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: '{',
                kind: '{',
                line: 20,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: '}',
                kind: '}',
                line: 20,
                col: 7,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 20,
                col: 8,
                idLevel: 0
            },
            {
                lexeme: 'z',
                kind: 'id',
                line: 21,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: '.',
                kind: '.',
                line: 21,
                col: 2,
                idLevel: 0
            },
            {
                lexeme: 'y',
                kind: 'id',
                line: 21,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: 'is',
                kind: 'is',
                line: 21,
                col: 5,
                idLevel: 0
            },
            {
                lexeme: '120',
                kind: 'intlit',
                line: 21,
                col: 8,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 21,
                col: 11,
                idLevel: 0
            },
            {
                lexeme: '(',
                kind: '(',
                line: 22,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'x',
                kind: 'id',
                line: 22,
                col: 2,
                idLevel: 0
            },
            {
                lexeme: '+',
                kind: '+',
                line: 22,
                col: 4,
                idLevel: 0
            },
            {
                lexeme: 'z',
                kind: 'id',
                line: 22,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: '.',
                kind: '.',
                line: 22,
                col: 7,
                idLevel: 0
            },
            {
                lexeme: 'y',
                kind: 'id',
                line: 22,
                col: 8,
                idLevel: 0
            },
            {
                lexeme: ')',
                kind: ')',
                line: 22,
                col: 9,
                idLevel: 0
            },
            {
                lexeme: '*',
                kind: '*',
                line: 22,
                col: 11,
                idLevel: 0
            },
            {
                lexeme: '10',
                kind: 'intlit',
                line: 22,
                col: 13,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 22,
                col: 15,
                idLevel: 0
            },
            {
                lexeme: 'x',
                kind: 'id',
                line: 24,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'be',
                kind: 'be',
                line: 24,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: '100',
                kind: 'intlit',
                line: 24,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 24,
                col: 9,
                idLevel: 0
            },
            {
                lexeme: 'y',
                kind: 'id',
                line: 25,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'be',
                kind: 'be',
                line: 25,
                col: 3,
                idLevel: 0
            },
            {
                lexeme: 'nah',
                kind: 'nah',
                line: 25,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 25,
                col: 9,
                idLevel: 0
            },
            {
                lexeme: 'if',
                kind: 'if',
                line: 27,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'yah',
                kind: 'yah',
                line: 27,
                col: 4,
                idLevel: 0
            },
            {
                lexeme: ':',
                kind: ':',
                line: 27,
                col: 7,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 27,
                col: 8,
                idLevel: 0
            },
            {
                lexeme: 'INDENT',
                kind: 'INDENT',
                line: 28,
                col: 3,
                idLevel: 2
            },
            {
                lexeme: 'x',
                kind: 'id',
                line: 28,
                col: 3,
                idLevel: 2
            },
            {
                lexeme: 'be',
                kind: 'be',
                line: 28,
                col: 5,
                idLevel: 2
            },
            {
                lexeme: '0',
                kind: 'intlit',
                line: 28,
                col: 8,
                idLevel: 2
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 28,
                col: 9,
                idLevel: 2
            },
            {
                lexeme: 'DEDENT',
                kind: 'DEDENT',
                line: 29,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'else',
                kind: 'else',
                line: 29,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: ':',
                kind: ':',
                line: 29,
                col: 5,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 29,
                col: 6,
                idLevel: 0
            },
            {
                lexeme: 'INDENT',
                kind: 'INDENT',
                line: 30,
                col: 3,
                idLevel: 2
            },
            {
                lexeme: 'spit',
                kind: 'spit',
                line: 30,
                col: 3,
                idLevel: 2
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 30,
                col: 7,
                idLevel: 2
            },
            {
                lexeme: 'DEDENT',
                kind: 'DEDENT',
                line: 32,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: 'yah',
                kind: 'yah',
                line: 32,
                col: 1,
                idLevel: 0
            },
            {
                lexeme: '||',
                kind: '||',
                line: 32,
                col: 5,
                idLevel: 0
            },
            {
                lexeme: 'nah',
                kind: 'nah',
                line: 32,
                col: 8,
                idLevel: 0
            },
            {
                lexeme: 'newline',
                kind: 'newline',
                line: 32,
                col: 11,
                idLevel: 0
            },
            {
                lexeme: 'EOF',
                kind: 'EOF'
            }

        ]

        return tokenList;
    }();

module.exports = testTokens;