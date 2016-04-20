var scan = require('../../scanner/scanner'),
    should = require('should'),
    tokenList = require('./expected/outputs.js');
var assert = require('chai').assert;

var promise = new Promise(function(resolve, reject) {
    var token = scan('test/scanner/inputs/valid/sample1.yah', function(tokens) {
        console.log(tokens);
    });
    if (token) {
        resolve("Failed")
    } else {
        reject(function() {
            throw new Error("Indentation Error")
        })
    }

});
promise.then(function(result) {
    console.log(result);

}).catch(function() {
    throw new Error("Indentation Error")
})