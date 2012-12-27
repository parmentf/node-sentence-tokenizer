/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

var debug = require('debug')('rwc:test');
var assert = require('assert');

var Tokenizer = require('../lib/tokenizer');

describe('Tokenizer creations', function () {
  describe('No botname', function () {
    var tokenizer = new Tokenizer('François');

    it('should use ECTOR as a default botname', 
      function() {
        assert.equal('ECTOR', tokenizer.botname);
      });
  });
  describe('With specific botname', function () {
    var tokenizer = new Tokenizer('François', 
                                  'Achille');

    it('should use Achille as a botname', function() {
      assert.equal('Achille', tokenizer.botname);
    });
  });
});

describe('Sentences token', function () {
  var tokenizer = new Tokenizer('François');
  var entry = "Nous allons bien voir ce que ça   donne!" +
  " N'est-ce pas ? " + 
  " Et avec une URL en plus, c'est mieux: http://google.com." +
  " Mais il nous manque encore un mail: gg@gggg.kk";
  tokenizer.setEntry(entry);
  var sentences = tokenizer.getSentences();
  it("should get 4 sentences", function () {
    debug("sentences",sentences);
    assert.equal(4, sentences.length);
  });
});
