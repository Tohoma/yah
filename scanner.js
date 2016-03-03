fs = require('fs')
byline = require('byline')
XRegExp = require('xregexp')

const WORD_CHAR = XRegExp '[\\p{L}\\p{Nd}_]';

module.exports = function(filename, callback) {
    var baseStream = fs.createReadStream(filename,{encoding: 'utf8'})
    //Current error is a placeholder
    //baseStream.on('error', function(){console.log("I got an error")})

    var stream = byline(baseStream, {keepEmptyLines: true})
    var tokens = []
    var linenumber = 0
    stream.on('readable', function(){
        scan(stream.read(),linenumber++,tokens)
    })
    stream.once('end', function() {
        tokens.push({kind: 'EOF', lexeme:'EOF', idlevel: 0})
        callback(tokens)
    })
}

var scan = function(line, linenumber, tokens) {
    var pos = 0;
    var start = 0;
    var indentMode = true;
    var indentationStack = {}

    var emit = function(type,word, indentation){
        tokens.push({kind:type, lexeme:word, idlevel: indentation})
    }

    if(!line){return}

    while(true){
        //calculates indentation
        while(/\s/.test(line[pos])&&indentMode)
        // Skips over non indent spaces
        while (/\s/.test(line[pos])&&!indentMode){
            pos++
        } 

        start = pos
        //Single line comments
        if(line[pos]==="/" &&line[pos + 1] === "/") {break}

        if(line[pos]){ 
        //Should print out character and position. Will remove later.
        console.log(line[pos]);
        pos++;
        console.log(pos);
        
        } else{
            console.log(line);
            indentMode = true;
            break}
    }
    

}