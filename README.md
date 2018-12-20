# Sentence Tokenizer [![Build Status](https://secure.travis-ci.org/parmentf/node-sentence-tokenizer.png)](http://travis-ci.org/parmentf/node-sentence-tokenizer) [![NPM version](https://badge.fury.io/js/sentence-tokenizer.png)](http://badge.fury.io/js/sentence-tokenizer)

Tokenize paragraphs into sentences, and smaller tokens.

## Installation

Use [npm](http://npmjs.org):

```bash
npm install sentence-tokenizer
```

## How to

Require the module:

```js
var Tokenizer = require('sentence-tokenizer').Tokenizer;
```

Instanciate a tokenizer, with the name of the utterer:

```js
var tokenizer = new Tokenizer('Chuck');
```

Set the entry to work on:

```js
tokenizer.entry = "This is an entry. Possibly composed of several sentences.";
```

Get the sentences:

```js
console.log(tokenizer.sentences);
```

Which should produce:

```js
[ 'This is an entry.',
  'Possibly composed of several sentences.' ]
```

If you want word-level tokens, use:

```js
console.log(tokenizer.getTokens());
```

Yielding:

```js
[ 'This',
  'is',
  'an',
  'entry.' ]
```

To get the second sentence, use:

```js
console.log(tokenizer.getTokens(1));
```

## Warning

As this package is made for a [conversational bot](https://github.com/parmentf/node-ector), the Tokenizer class get two parameters (`username` and `botname`), which have default values (`Guy`, and `ECTOR`).

When these are present in the entry, they are replaced with `{botname}` and `{yourname}` respectively.
If you don't want to use this functionality, pass two unlikely parameters (`kjsdfgiurbybuq`, for example).

## Also

* [https://github.com/chrisumbel/natural](https://github.com/chrisumbel/natural)
* [https://github.com/Floby/node-tokenizer](https://github.com/Floby/node-tokenizer)

## License

(The MIT License)

Copyright 2012 François Parmentier. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
