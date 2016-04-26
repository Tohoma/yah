#!/usr/bin/env node

var argv, error, generate, parse, scan;

argv = require('yargs')
    .usage('$0 [-t] [-a] [-o] [-i] filename')
    .boolean(['t', 'a', 'o', 'i'])
    .describe('t', 'show tokens after scanning then stop')
    .describe('a', 'show abstract syntax tree after parsing then stop')
    .describe('o', 'do optimizations')
    .describe('i', 'generate and show the intermediate code then stop')
    .describe('target', 'generate code for JavaScript')
    .demand(1)
    .argv;

scan = require('./scanner/scanner');
parse = require('./parser/parser');
// generate = (require('./generator'))(argv.target);
error = require('./error/error');
error.quiet = false
scan(argv._[0], function(tokens) {
    var i, len, program, t;
    if (error.count > 0) {
        return;
    }
    if (argv.t) {
        for (i = 0, len = tokens.length; i < len; i++) {
            t = tokens[i];
            console.log(t);
        }
        return;
    }
    console.log("Parsing")
    program = parse(tokens);
    if (error.count > 0) {
        return;
    }
    if (argv.a) {
        console.log(program.toString());
        return;
    }
    // program.analyze();
    if (error.count > 0) {
        return;
    }
    if (argv.o) {
        program = program.optimize();
    }
    if (argv.i) {
        program.showSemanticGraph();
        return;
    }
    return generate(program);
});