/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

var debug = require('debug')('tokenizer:test');
var assert = require('assert');

var Tokenizer = require('../lib/tokenizer');

describe('Tokenizer creations', function () {
  describe('No botname', function () {
    var tokenizer = new Tokenizer('François');

    it('should use ECTOR as a default botname', 
      function() {
        assert.equal(tokenizer.botname, 'ECTOR');
      });
  });
  describe('With specific botname', function () {
    var tokenizer = new Tokenizer('François', 
                                  'Achille');

    it('should use Achille as a botname', function() {
      assert.equal(tokenizer.botname, 'Achille');
    });
  });
});

describe('Sentences token', function () {
  var tokenizer = new Tokenizer('François');
  describe('Classic', function () {
    var entry = "Nous allons bien voir ce que ça   donne!" +
    " N'est-ce pas ? " + 
    " Et avec une URL en plus, c'est mieux: http://google.com." +
    " Mais il nous manque encore un mail: gg@gggg.kk";
    tokenizer.setEntry(entry);
    var sentences = tokenizer.getSentences();
    it("should get 4 sentences", function () {
      assert.equal(sentences.length, 4);
    });
    it("should have the first sentence", function () {
      assert.equal(sentences[0],
        "Nous allons bien voir ce que ça donne!");
    });
    it("should have second sentence", function () {
      assert.equal(sentences[1], "N'est-ce pas ?");
    });
    it("should have third sentence", function () {
      assert.equal(sentences[2],
        "Et avec une URL en plus, c'est mieux: http://google.com.");
    });
    it("should have fourth sentence", function () {
      assert.equal(sentences[3],
        "Mais il nous manque encore un mail: gg@gggg.kk");
    });    
  });
  describe('False end', function () {
    var entry = "Bon sang ce n'est pas ça. Bon sang";
    tokenizer.setEntry(entry);
    var sentences = tokenizer.getSentences();
    it('should produce only 2 sentences', function () {
      assert.equal(sentences.length, 2);
    });
  });
  describe('Names', function () {
    var entry = "Salut ECTOR. Je m'appelle François.";
    tokenizer.setEntry(entry);
    var sentences = tokenizer.getSentences();
    it('botname replaced', function () {
      assert.equal(sentences[0], 'Salut {yourname}.');
    });
    it('username replaced', function () {
      assert.equal(sentences[1], "Je m'appelle {myname}.");
    });
  });
});
