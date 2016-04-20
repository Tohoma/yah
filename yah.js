#!/usr/bin/env node

var scan = require('./scanner/scanner.js');
var parse = require('./parser/parser.js')
var error = require('./error/error.js')
var argv = require('yargs')
    .command('scan', 'Scans the file for tokens', function(yargs) {
        yargs.options({
            file: {
                demand: true,
                alias: 'f',
                description: 'the filepath',
                type: 'string'
            }
        })
    }).command('parse', 'Generates AST of file', function(yargs) {
        yargs.options({
            file: {
                demand: true,
                alias: 'f',
                description: 'the filepath',
                type: 'string'
            }
        })
    }).argv
var command = argv._[0];


if (command === "scan") {
    console.log(argv.f)
    scan("./" + argv.f, function(tokens) {
        console.log(tokens);
        console.log("The error count "+error.count)
    })
} else if (command === "parse") {
    scan("./" + argv.f, function(tokens) {
        var code = parse(tokens);
        console.log(code.toString())

    })

}