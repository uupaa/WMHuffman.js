(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function WMHuffman() {
}

//{@dev
WMHuffman["repository"] = "https://github.com/uupaa/WMHuffman.js"; // GitHub repository URL. http://git.io/Help
//}@dev

WMHuffman["buildTable"] = WMHuffman_buildTable; // WMHuffman.buildTable(source:LengthUint8Array):HuffmanCodeTableUint32Array

// --- implements ------------------------------------------
function WMHuffman_buildTable(source) { // @arg CodeLengthUint8Array - [codeLength, ...]
                                        // @ret Object - { huffmanCodeTable, maxCodeLength, minCodeLength }
                                        // @result.huffmanCodeTable Uint32Array
                                        // @result.maxCodeLength Integer
                                        // @result.minCodeLength Integer
//{@dev
    $valid($type(source, "CodeLengthUint8Array"), WMHuffman_buildTable, source);
//}@dev

    var sourceLength = source.length;
    var maxCodeLength = Math.max.apply(0, source);
    var minCodeLength = Math.min.apply(0, source);
    var skipLength = 2; // skip length for huffman code table filling.
    var bitLength = 1;

    var huffmanCode = 0;
    var huffmanCodeTableSize = 1 << maxCodeLength;
    var huffmanCodeTable = new Uint32Array(huffmanCodeTableSize);

    // Assign to Huffman code in order by short bit length.
    while (bitLength <= maxCodeLength) {
        for (var i = 0; i < sourceLength; ++i) {
            var len = source[i];

            if (len === bitLength) {

                // reverse bit order.
                var code = huffmanCode;
                var j = 0, k = 0;

                for (; j < bitLength; ++j) {
                    k = (k << 1) | (code & 1);
                    code >>= 1;
                }

                // table filling.
                var value = (bitLength << 16) | i;

                for (; k < huffmanCodeTableSize; k += skipLength) {
                    huffmanCodeTable[k] = value;
                }
                ++huffmanCode;
            }
        }

        ++bitLength;
        huffmanCode <<= 1;
        skipLength  <<= 1;
    }
    return {
        "huffmanCodeTable": huffmanCodeTable, // Uint32Array
        "maxCodeLength":    maxCodeLength,    // Integer
        "minCodeLength":    minCodeLength     // Integer
    };
}

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = WMHuffman;
}
global["WMHuffman" in global ? "WMHuffman_" : "WMHuffman"] = WMHuffman; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

