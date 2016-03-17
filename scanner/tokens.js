var tokenList = {},

    tokens = function() {

        tokenList.oneCharacterToken = [
            '+', '-', '*', '/', '%', '^', '!', '.', ',','?'
        ]

        tokenList.twoCharacterToken = [
            '->', '&&', '||'
        ]

        tokenList.reservedWords = [
            'Class', 'new',
            'for', 'in', 'while',
            'and', 'or',
            'is', 'be',
            'if', 'else', 'elif',
            'not',
            'yah', 'nah',
            'spit',
            'nil',
            'undefined',
            'NaN',
            'eq', 'neq', 'gt', 'lt', 'geq', 'leq'
        ]
        return tokenList;
    }();

module.exports = tokens;