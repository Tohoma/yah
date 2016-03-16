var tokenList = {},

    tokens = function() {

        tokenList.oneCharacterToken = [
            '+', '-', '*', '/', '%', '^', '!', '.', ','
        ]

        tokenList.reservedWords = [
            'class',
            'for', 'in', 'while',
            'and', 'or',
            'is',
            'if', 'else',
            'not',
            'yah', 'nah', 'true', 'false',
            'spit', 'return',
            'nil',
            'undefined',
            'NaN',
            'eq', 'neq', 'gt', 'lt', 'geq', 'leq'
        ]
        return tokenList;
    }();

module.exports = tokens;