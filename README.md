# WMHuffman.js [![Build Status](https://travis-ci.org/uupaa/WMHuffman.js.png)](http://travis-ci.org/uupaa/WMHuffman.js)

[![npm](https://nodei.co/npm/uupaa.wmhuffman.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.wmhuffman.js/)

Huffman table functions.


WMHuffman.js is a fork from [zlib.js](https://github.com/imaya/zlib.js)

## Document

- [WMHuffman.js wiki](https://github.com/uupaa/WMHuffman.js/wiki/WMHuffman)
- [WebModule](https://github.com/uupaa/WebModule)
    - [Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
    - [Development](https://github.com/uupaa/WebModule/wiki/Development)

## How to use

### Browser

```js
<script src="lib/WMHuffman.js"></script>
<script>
var source = new Uint8Array([1,2,3]);
var result = WMHuffman.buildTable(source);
</script>
```

### WebWorkers

```js
importScripts("lib/WMHuffman.js");

...
```

### Node.js

```js
var WMHuffman = require("lib/WMHuffman.js");

...
```
