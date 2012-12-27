/*jshint node:true, laxcomma:true */
"use strict";

var debug = require('debug')('tokenizer');

var sugar = require('sugar');

function Tokenizer(username, botname) {

  // Maybe it is not useful
  if (!(this instanceof Tokenizer)) {
    return new Tokenizer();
  }

  this.username = username;
  this.entry = null;
  this.sentences = null;

  if (typeof botname == 'string') {
    this.botname = botname;
  }
  else {
    this.botname = 'ECTOR';
  }
}

Tokenizer.prototype = {
  setEntry : function (entry) {
    this.entry = entry.compact();
    this.sentences = null;
  },
  // Split the entry into sentences.
  getSentences : function () {
    this.sentences = [];
    // this.sentences = this.entry.split(/[\.!]\s/);
    var words = this.entry.words();
    var endingWords = words.filter(function(w) {
      return w.endsWith(/[\.!\?]/);
    });

    var self = this;
    words.reduce(function(prev,cur, index, array) {
      prev = prev + " " + cur;
      if(endingWords.indexOf(cur) != -1 ||
        index === array.length -1)
      {
        self.sentences.push(prev.compact());
        prev = "";
      }
      return prev;
    });
    return this.sentences;
  }
};

module.exports = Tokenizer;