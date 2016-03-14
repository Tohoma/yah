var fs = require('fs');
var byline = require('byline');
var XRegExp = require('xregexp');
var tokenList = require('./tokens.js');


const LETTER = /[a-zA-Z]/
const WORD_CHAR = XRegExp('[\\p{L}\\p{Nd}_]');
const DIGIT = /\d/;
const RESERVED_WORD = /is|yah|nil|spit|undefined|NaN|print/;
const ONE_CHARACTER_TOKENS = /[+\*{^}|,\.{-}{!}{/}{(}{)}\[\]]/;

module.exports = function(filename, callback) {
    var baseStream = fs.createReadStream(filename, {
        encoding: 'utf8'
    })

    //Current error is a placeholder
    baseStream.on('error', function() {
        console.log("I got an error")
    })

    var stream = byline(baseStream, {
        keepEmptyLines: true
    })
    var tokens = []
    var linenumber = 0
    stream.on('readable', function() {
        scan(stream.read(), linenumber++, tokens)
    })
    stream.once('end', function() {
        tokens.push({
            kind: 'EOF',
            lexeme: 'EOF'
        })
        callback(tokens)
    })
}

var scan = function(line, linenumber, tokens) {
    var pos = 0;
    var start = 0;
    var indentMode = true;
    var idLevel = 0;

    var emit = function(type, word, indentation, col, line) {
        tokens.push({
            kind: type,
            lexeme: word,
            idLevel: indentation,
            col: col,
            line: line
        })
    }

    if (!line) {
        return
    }

    while (true) {
        //calculates indentation
        while (indentMode) {
            if (!/\s/.test(line[pos])) {
                idLevel = pos;
                indentMode = false;
                pos--;
            }
            pos++
        }
        // Skips over non indent spaces
        while (/\s/.test(line[pos]) && !indentMode) {
            pos++
        }

        start = pos
            //Single line comments
        if (line[pos] === "/" && line[pos + 1] === "/") {
            break
        }

        //One Character tokens
        if (ONE_CHARACTER_TOKENS.test(line[pos])) {
            emit(line[pos], line[pos], idLevel, pos + 1, linenumber + 1);

        // Reserved Words and Declarations

        } else if (LETTER.test(line[pos])) {
            while (WORD_CHAR.test(line[pos + 1]) && (pos < line.length)) {
                pos++

            }
            var matchedWord = line.substring(start, pos + 1)
            if (RESERVED_WORD.test(matchedWord)) {
                emit(matchedWord, matchedWord, idLevel, start + 1, linenumber + 1);
            } else if (matchedWord === "") {
                emit("newline", "newline", idLevel, start + 1, linenumber + 1);

            } else {
                emit("id", matchedWord, idLevel, start + 1, linenumber + 1)
            }


            //Digits

        } else if (DIGIT.test(line[pos])) {
            emit("intlit", line[pos], idLevel, start + 1, linenumber + 1);
        }


        if (line[pos]) {
            pos++;
        } else {
            indentMode = true;

            break
        }
    }

}