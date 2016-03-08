should = require 'should'
scan = require '../scanner'  # Needs to be changed
error = require '../error'
tokenFile = require './outputs.coffee' 
{inspect: i} = require 'util'

describe 'The scanner', ->
  expectedTokens = tokenFile.sample1_tokens

  it 'scans sample 1 program', (done) ->
    scan 'test/inputs/program1.yah', (tokens) ->
      tokens.length.should.equal 4
      i(tokens[0]).should.equal i {kind:'write',lexeme:'write',line:1,col:1}
      i(tokens[1]).should.equal i {kind:'intlit',lexeme:'0',line:1,col:7}
      i(tokens[2]).should.equal i {kind:';',lexeme:';',line:1,col:8}
      i(tokens[3]).should.equal i {kind:'EOF',lexeme:'EOF'}
      done()