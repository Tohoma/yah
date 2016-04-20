var tokenList = {},

    tokens = function() {

        tokenList.oneCharacterToken = [
            '+', '-', '*', '/', '%', '^', '!', '.', ',', '?'
        ]

        tokenList.twoCharacterToken = [
            '->', '&&', '||'
        ]

        tokenList.reservedWords = [
            'class', 'new',
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
            'eq', 'neq', 'gt', 'lt', 'geq', 'leq',
            'int', 'float', 'bool', 'string',
            'list', 'tuple', 'dict'
        ]
        return tokenList;
    }();

module.exports = tokens;