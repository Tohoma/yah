#!/usr/bin/env node
var scanner = require('./scanner/scanner.js');
var argv = require('yargs')
	.command('scan','Scans the file for tokens', function(yargs){
		yargs.options({
			
		})
	})
