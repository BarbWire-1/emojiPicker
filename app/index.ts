
import document from "document";
import { decode } from "jpeg";
import {keyHex, emojisHex, shortKeys} from "./fitmoji";

// CONTAINERS
const buttons = document.getElementById("buttons") as GroupElement;
const single = document.getElementById("single") as GroupElement;
const multiview = document.getElementById("multiview") as GroupElement;


// GET FROM CONTAINERS
const emojiNumber = single.getElementById("emojiCode") as TextElement;
const emoji = single.getElementById("emoji") as TextElement;
const viewButton = buttons.getElementById("viewButton") as RectElement;
const modeText = buttons.getElementById("viewMode") as TextElement;
const nextEmoji = buttons.getElementById("nextEmoji") as TextElement;
const prevEmoji = buttons.getElementById("lastEmoji") as TextElement;


// BUTTONS
nextEmoji.text = "⏩";
prevEmoji.text = "⏪";

// FUNCTIONS
// Formats hex to U+(0)0000 to display
let displayHex = (hex: number) => {
  if (hex <= 0xFFFF){
    return `U+${(`0000${hex.toString(16)}`).slice(-4).toUpperCase()}`;
  } else {
    return `U+${(hex.toString(16)).slice(-4).toUpperCase()}`;
  }
};

// CONVERSION HEX TO STRING
// NOT working for >FFFF
// TODO check out the regex for conversion
function stringFromCharCode (codePoint) {
  if (codePoint > 0xFFFF) {
      codePoint -= 0x10000;
      return String.fromCharCode(0xD800 + 
        (codePoint >> 10), 0xDC00 + 
        (codePoint & 0x3FF));
  }
  else {
      return String.fromCharCode(codePoint);
  }
}

// ASSIGN EMOJIS
// single emoji
function assignEmoji(c: number): void {
  emojiNumber.text = String(c);
  emojiNumber.text = `index: ${c}, (${displayHex(emojisHex[c])})`;
  emoji.text = stringFromCharCode(emojisHex[c]);
}

const assignMulti = (factor: number) :void => {
  // 30 elements, load next 30 on click
  multiview.getElementsByClassName("multi").forEach((el: TextElement) => {
    let index = Number(el.id) + (30 * factor);
    el.text = stringFromCharCode(emojisHex[index]);
  }); 
}

const n: number= emojisHex.length;
let counter: number = 0; // to switch to next item in single view
let mode: number = 0; // to switch between single/multiview
let factor: number = 0; // to multiply index for multiview


// multi could be sufficient
// SWITCH VIEWMODE
// in single view incl index in array and HEX code
viewButton.onclick = ()  => {
  mode++;
  mode %=2;
  modeText.text = mode === 0 ? "single view" : "multi view";
  multiview.style.display = mode === 0 ? "none" : "inline";
  single.style.display = mode === 1 ? "none" : "inline";
  if (mode === 0){
    assignEmoji(counter)
  } else {
    assignMulti(factor)
  }
  return mode;
}

// BROWSE...
// ...to next
nextEmoji.onclick = () :void => {
  if (mode === 0) { // single view
    if (counter < n) {
      counter++;
      counter %= n;
      assignEmoji(counter);
    };
      
  } else if (factor < n / 30){ // multiview 
    factor++;
    factor %= Math.ceil(n / 30);
    assignMulti(factor); 
  };
};
  
// ...to previous
prevEmoji.onclick = () :void => {
  if (mode === 0) { // singleview
    if (counter > 0) {
      counter--;
      counter %= n;
      assignEmoji(counter); 
    };
  } else {
    if (factor > 0) { // multiview
      factor--;
      assignMulti(factor);
      factor %= Math.ceil(n / 30);
    };
  };
};


// function for shortkeys
// currently not in use
const emo = (key: string) => {
  let i: number = shortKeys.indexOf(key);
  return stringFromCharCode(emojisHex[i]);
};
//console.log(emo(":copyright:")); // © 


// CONSOLE.LOG CLICKED ITEM
// then can copy into element.text

// from multi view
document.getElementsByClassName("multi").forEach((el: TextElement) :void => {
  el.onclick = () :void => {
    console.log(JSON.stringify(el.text));
  };  
});
// from single view
emoji.onclick = () :void => {
  console.log(JSON.stringify(emoji.text));
};  


// add fun to display string from keyHex
//TODO add 2 buttons for mode, add textfiels for description
//TODO decide whether to keep different modes
//TODO check and really understand logic for normalization(s)
//TODO if all the >FFFF doesn't work, go with 0nly <=FFFF!

// console.log(String.fromCharCode(0x1f600))//  
// emoji.text = String.fromCharCode(0x1f600)//no glyph
// console.log(fixedFromCharCode(0x1f600))//������
//String.fromCodePoint(0x1f600)//fromCodePoint not defined.... buhuhuuuuuu

// console.log('𝌆')
// console.log('\uD834\uDF06')

//TODO:::::
// If U is a lead surrogate 16-bit code unit, U is not the last 16-bit code unit of the input, and the next 16-bit code unit of the input next is a trail surrogate 16-bit code unit, then consume next and append to result a code point of value
// 0x10000 + ((U - 0xD800) << 10) + (next - 0xDC00).
// is this "appendix" the diff/prob svg/js here???

function getSurrogates (len2, text) {
  var lenS = len2;
  for (var i = 0; i < text.length && i < len2; i++) {
      var charCode = text.charCodeAt(i);
      console.log(charCode.toString(16))
      // check for the first half of a surrogate pair
      if (charCode >= 0xD800 && charCode < 0xDC00) {
          lenS -= 1;
      }
      
  }
  return lenS;
}


//original :mushroom: correct pair
console.log(`original: ${getSurrogates(2, "🍄")}`)// ud83c udf44 - 
const appendix = (cP1,cP2) => {
  let a = 0x10000 + ((cP1 - 0xD800) << 10) + (cP2 - 0xDC00)
  return a.toString(16)
}

console.log(appendix(0xd83c, 0xdf44))//1f344
console.log(String.fromCharCode(Number(appendix(0xd83c, 0xdf44))))//


//log, when mushroom placed in svg <text>
console.log(emoji.text)// 🍄`i - 

// log when click on emoji from svg : "ߍ䠣"
// this varies in the second surrogate for each build
// but shows mushroom on display!!!
console.log(getSurrogates(2,"ߍ䠣"))// u7cd u4823 2!!!
getSurrogates(2,"ߍ䰙")// u7cd u4c19
getSurrogates(2,"ߍ䀙")// u7cd u4019

//emoji.text = ('\u7cd4\u4823') grrr.....
console.log("I \u2661 Javascript") // I ♡ Javascript  not included



// emoji.text=stringFromCharCode(0x7cd)// no glyph
// emoji.text=stringFromCharCode(0x4019)// no glyph

//https://jonisalonen.com/2012/from-utf-16-to-utf-8-in-javascript/
function toUTF8Array(str) {
  var utf8 = [];
  for (var i=0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6), 
                    0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12), 
                    0x80 | ((charcode>>6) & 0x3f), 
                    0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                    | (str.charCodeAt(i) & 0x3ff))
          utf8.push(0xf0 | (charcode >>18), 
                    0x80 | ((charcode>>12) & 0x3f), 
                    0x80 | ((charcode>>6) & 0x3f), 
                    0x80 | (charcode & 0x3f));
      }
  }
  return utf8;
}
console.log(toUTF8Array("🍄"))//240,159,141,132

const dunno = (str) => {
var utf8 = decodeURIComponent(encodeURIComponent(str));

  var arr = [];
    for (var i = 0; i < utf8.length; i++) {
      arr.push(utf8.charCodeAt(i));
  }
  return arr;
}
console.log(dunno("😍")) // 55357,56845


// http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

/* utf.js - UTF-8 <=> UTF-16 convertion
 *
 * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */

function Utf8ArrayToStr(array) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while(i < len) {
  c = array[i++];
  switch(c >> 4)
  { 
    case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
      // 0xxxxxxx
      out += String.fromCharCode(c);
      break;
    case 12: case 13:
      // 110x xxxx   10xx xxxx
      char2 = array[i++];
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
    case 14:
      // 1110 xxxx  10xx xxxx  10xx xxxx
      char2 = array[i++];
      char3 = array[i++];
      out += String.fromCharCode(((c & 0x0F) << 12) |
                     ((char2 & 0x3F) << 6) |
                     ((char3 & 0x3F) << 0));
      break;
  }
  }

  return out;
}
console.log(Utf8ArrayToStr(dunno([240,159,141,132] )))//240,159,141,132

function encode_utf8(s) {
  return decodeURIComponent(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(encodeURIComponent(s));
}
let encode = encode_utf8('\u1f344')
let decode2 = decode_utf8(encode)

console.log(encode+" => "+decode2)//ἴ4 => ἴ4 






//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
const sentence = 'The quick brown fox jumps over the lazy dog.';

const index = 4;

console.log(`The character at index ${index} is ${sentence.charAt(index)}`);//ok
// expected output: "The character at index 4 is q"

var anyString = 'Brave new world';
console.log("The character at index 0   is '" + anyString.charAt(0)   + "'");
// No index was provided, used 0 as default

console.log("The character at index 0   is '" + anyString.charAt(0)   + "'");
console.log("The character at index 1   is '" + anyString.charAt(1)   + "'");
console.log("The character at index 2   is '" + anyString.charAt(2)   + "'");
console.log("The character at index 3   is '" + anyString.charAt(3)   + "'");
console.log("The character at index 4   is '" + anyString.charAt(4)   + "'");
console.log("The character at index 999 is '" + anyString.charAt(999) + "'");//ok


var str = 'A \uD87E\uDC04 Z'; // We could also use a non-BMP character directly
for (var i = 0, chr; i < str.length; i++) {
  if ((chr = getWholeChar(str, i)) === false) {
    continue;
  }
  // Adapt this line at the top of each loop, passing in the whole string and
  // the current iteration and returning a variable to represent the
  // individual character

  console.log("chr: "+chr);//������
}

function getWholeChar(str, i) {
  var code = str.charCodeAt(i);

  if (code.typeof != Number) { // not included
  
     return ''; // Position not found
   }
  if (code < 0xD800 || code > 0xDFFF) {
    return str.charAt(i);
  }

  // High surrogate (could change last hex to 0xDB7F to treat high private
  // surrogates as single characters)
  if (0xD800 <= code && code <= 0xDBFF) {
    if (str.length <= (i + 1)) {
      throw 'High surrogate without following low surrogate';
    }
    var next = str.charCodeAt(i + 1);
      if (0xDC00 > next || next > 0xDFFF) {
        throw 'High surrogate without following low surrogate';
      }
      return str.charAt(i) + str.charAt(i + 1);
  }
  // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
  if (i === 0) {
    console.error( 'Low surrogate without preceding high surrogate');
  }
  var prev = str.charCodeAt(i - 1);

  // (could change last hex to 0xDB7F to treat high private
  // surrogates as single characters)
  if (0xD800 > prev || prev > 0xDBFF) {
    console.error('Low surrogate without preceding high surrogate');
  }
  // We can pass over low surrogates now as the second component
  // in a pair which we have already processed
  return false;
}
//console.log(getWholeChar(\u1F60D ,1))//false doesn'accept
console.log(getWholeChar("😍",2))//Unhandled exception: Low surrogate without preceding high surrogate
console.log(getWholeChar(('\uD83C\uDF44'),2))//false 
console.log(getWholeChar(('\uD83C\uDF44'),1))



function fixedCharAt(str, idx) {
  let ret = ''
  str += ''
  let end = str.length

  let surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
  while ((surrogatePairs.exec(str)) != null) {
    let lastIdx = surrogatePairs.lastIndex
    if (lastIdx - 2 < idx) {
      idx++
    } else {
      break
    }
  }

  if (idx >= end || idx < 0) {
    return ''
  }

  ret += str.charAt(idx)

  if (/[\uD800-\uDBFF]/.test(ret) && /[\uDC00-\uDFFF]/.test(str.charAt(idx + 1))) {
    // Go one further, since one of the "characters" is part of a surrogate pair
    ret += str.charAt(idx + 1)
  }
  return ret
}
console.log(`fixedCharAt: ${fixedCharAt("\uD83C\uDF44", 2)}`)
console.log(`fixedCharAt: ${fixedCharAt("😍", 2)}`)

//FITBIT FS
import * as fs from "fs";
//let utf8_data = "JavaScript is da best 😍";
let utf8_data = "\u{D83D}\u{DE0D}";//UTF-8 Data: JavaScript is da best ������
fs.writeFileSync("utf8.txt", utf8_data, "utf-8");


let utf8_read = fs.readFileSync("utf8.txt", "utf-8");
console.log("UTF-8 Data: " + utf8_read); //UTF-8 Data: JavaScript is da best ������
//emoji.text = utf8_read;// not displayed


let stats = fs.statSync("utf8.txt");
if (stats) {
  console.log("File size: " + stats.size + " bytes");
  console.log("Last modified: " + stats.mtime);
}


//IMPORT NOZ WORKING
// https://www.npmjs.com/package/normalize-unicode-text
// import { normalizeUnicodeText } from 'normalize-unicode-text'
//  
// console.log(normalizeUnicodeText('øqßweŁﬀÆǣ'))
// // oqssweLffAEae
//  
// console.log(normalizeUnicodeText('äÄàÀãÃçÇõÕûÛýÝñ'))
// // aAaAaAcCoOuUyYn
console.log(JSON.stringify("\ud83c\udf44"))// "������" 
console.log(JSON.stringify(0x1f344))//127812 
console.log(JSON.stringify("\u1f344"))//"ἴ4" 
console.log(JSON.stringify(decodeURIComponent('%F0%9F%92%A9')))//"������" 
//emoji.text = decodeURIComponent('%F0%9F%92%A9') //doesn't show
//console.log(emoji.text)// nothing
//emoji.text = JSON.stringify(encodeURIComponent('%F0%9F%92%A9'))
//console.log(emoji.text)//"%25F0%259 

console.log(JSON.stringify(decodeURIComponent('\uD83C\uDF44')))//"������" 
console.log("🍄")



//https://qastack.com.de/programming/6226189/how-to-convert-a-string-to-bytearray

const str2Bytes = (str) => {
  let bytes = [];
  let charCode;

  for (var i = 0; i < str.length; ++i)
  {
      charCode = str.charCodeAt(i);
      bytes.push((charCode & 0xFF00) >> 8);
      bytes.push(charCode & 0xFF);
  }
  return(bytes.join(' '));
}

let a = str2Bytes("ABC");
console.log(a);
// 0 65 0 66 0 67 

console.log(str2Bytes("😍"));
// 216 61 222 13

console.log(str2Bytes('\uD83D\uDE0D'))// codePoint surrogate pair
// 216 61 222 13 

console.log(str2Bytes(('\uD83D')))// leading
// 216 61

console.log(str2Bytes('\uDE0D'))// trailing
// 222 13


console.log(str2Bytes('\uDE0D\uD83D'))
// 222 13 216 61 


//in UTF 55357,56845
//TODO organize all these functions 
// get this: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
const bytes2String = (b) => {
  String.fromCharCode.apply(null, b)
}
console.log(bytes2String([216, 61, 222, 13,]))// undefined
console.log(bytes2String([102, 111, 111]))

console.log(String.fromCharCode.apply(null, [102, 111, 111]))// foo
console.log(('\xF0\x9F\x92\xA9').toString()) // ð© 