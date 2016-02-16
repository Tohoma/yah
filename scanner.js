fs = require(fs)
byline = require(byline)
{XRegExp} = require(xregexp)

module.exports = function(filename, callback) {
	var baseStream = fs.createReadStream(filename,{encoding: 'utf8'})
	//Current error is a placeholder
	baseStream.on('error', function(){console.log("Whoops")})

	var stream = byline(baseStream, {keepEmptyLines: true})
	var tokens = []
	var linenumber = 0
	stream.on('readable', function(){
		scan(stream.read(),linenumber++,tokens)
	})
	stream.once('end', function() {
		tokens.push({kind: 'EOF', lexeme:'EOF'})
		callback(tokens)
	})
}
