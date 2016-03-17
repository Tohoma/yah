var tokenList = {},

    tokens = function() {

        tokenList.oneCharacterToken = [
            '+', '-', '*', '/', '%', '^', '!', '.', ',','?'
        ]

        tokenList.twoCharacterToken = [
            '->', '&&', '||', '**'
        ]

        tokenList.reservedWords = [
            'class', 'new',
            'for', 'in', 'while',
            'and', 'or',
            'is', 'be',
            'if', 'else', 'elif'
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