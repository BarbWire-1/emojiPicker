import document from "document"


import * as fs from "fs";
let utf8_data = "JavaScript is da best 😍";
fs.writeFileSync("utf8.txt", utf8_data, "utf-8");

console.log(utf8_data)
let emoji = document.getElementById("emoji");

emoji.text =  "😄";
emoji.text =  "❤️";//from emoji
//emoji.text =  String.fromCodePoint(0x1F47B);

//@ts-ignore
if (!String.fromCodePoint) (function(stringFromCharCode) {
    var fromCodePoint = function(_) {
      var codeUnits = [], codeLen = 0, result = "";
      for (var index=0, len = arguments.length; index !== len; ++index) {
        var codePoint = +arguments[index];
        // correctly handles all cases including `NaN`, `-Infinity`, `+Infinity`
        // The surrounding `!(...)` is required to correctly handle `NaN` cases
        // The (codePoint>>>0) === codePoint clause handles decimals and negatives
        if (!(codePoint < 0x10FFFF && (codePoint>>>0) === codePoint))
          throw RangeError("Invalid code point: " + codePoint);
        if (codePoint <= 0xFFFF) { // BMP code point
          codeLen = codeUnits.push(codePoint);
        } else { // Astral code point; split in surrogate halves
          // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          codePoint -= 0x10000;
          codeLen = codeUnits.push(
            (codePoint >> 10) + 0xD800,  // highSurrogate
            (codePoint % 0x400) + 0xDC00 // lowSurrogate
          );
        }
        if (codeLen >= 0x3fff) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result + stringFromCharCode.apply(null, codeUnits);
    };
    try { // IE 8 only supports `Object.defineProperty` on DOM elements
      Object.defineProperty(String, "fromCodePoint", {
        "value": fromCodePoint, "configurable": true, "writable": true
      });
    } catch(e) {
        //@ts-ignore
      String.fromCodePoint = fromCodePoint;
    }
}(String.fromCharCode));

//emoji.text =  String.fromCharCode(0x1F47B);

function convertFromHex(hex) {
    var hex = hex.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function convertToHex(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}
emoji.text =  convertFromHex(0x1F47B);
emoji.text = "😍"
emoji.text = "❤️"

