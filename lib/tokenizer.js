"use strict";

// eslint-disable-next-line no-unused-vars
var debug = require('debug')('tokenizer');

function compact(str) {
  var res = str.trim();
  res = res.replace('  ', ' ');
  return res;
}

function Tokenizer(username, botname) {

  // // Maybe it is not useful
  // if (!(this instanceof Tokenizer)) {
  //   return new Tokenizer();
  // }

  this.username = username || 'Guy';
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
    this.entry = compact(entry);
    this.sentences = null;
  },
  // Split the entry into sentences.
  getSentences : function () {
    // this.sentences = this.entry.split(/[\.!]\s/);
    if (!this.entry) return [];
    var words = this.entry.split(' ');
    var endingWords = words.filter(function(w) {
      return w.endsWith('.') || w.endsWith('!') || w.endsWith('?');
    });

    var self = this;
    var botnameRegExp = new RegExp("\\W?" + self.botname.normalize() + "\\W?");
    var usernameRegExp = new RegExp("\\W?" + self.username.normalize() + "\\W?");
    var lastSentence = words[0];
    self.sentences = [];
    words.reduce(function (prev, cur) {
      var curNormalized = cur.normalize();
      var curReplaced = cur;
      if (curNormalized.search(botnameRegExp) !== -1) {
        curReplaced = cur.replace(self.botname,"{yourname}");
      }
      else if (curNormalized.search(usernameRegExp) !== -1) {
        curReplaced = cur.replace(self.username,"{myname}");
      }

      if (endingWords.indexOf(prev) != -1) {
        self.sentences.push(compact(lastSentence));
        lastSentence = "";
      }
      lastSentence = lastSentence + " " + curReplaced;
      return cur;
    });
    self.sentences.push(compact(lastSentence));
    return this.sentences;
  },
  // Get the tokens of one sentence
  getTokens : function (sentenceIndex) {
    var s = 0;
    if(typeof sentenceIndex === 'number') s = sentenceIndex;
    return this.sentences[s].split(' ');
  }
};

module.exports = Tokenizer;