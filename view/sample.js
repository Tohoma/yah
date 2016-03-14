var scan = require('../scanner/scanner.js');

scan('../test/scanner/inputs/valid/sample1.yah', function(tokens) {
    console.log(tokens);
});