// polyfill all `core-js` features, including early-stage proposals:

import document from "document";
import {emojisHex, shortKeys} from "./fitmoji";
import { fixedFromCharCode } from "./polyfills/readUTF";
import "./polyfills/codePointAt"
import "./polyfills/fromCodePoint"
//import "./polyfills/unorm"

// containers
const buttons = document.getElementById("buttons");
const single = document.getElementById("single") as GraphicsElement;
const multiview = document.getElementById("multiview") as GraphicsElement;


// search in containers
const emojiNumber = single.getElementById("emojiCode");
const emoji = single.getElementById("emoji");
const viewButton = buttons.getElementById("viewButton");
const modeText = buttons.getElementById("viewMode")
const nextEmoji = buttons.getElementById("nextEmoji");
const prevEmoji = buttons.getElementById("lastEmoji");


// BUTTONS
nextEmoji.text = "⏩";
prevEmoji.text = "⏪";

//FUNCTIONS
//Formats array items to 0x00000
let displayHex = (hex: number) => {return `0x${("00000" +hex.toString(16)).slice(-5)}`};

//ASSIGNS EMOJIS
const assignEmoji = (c: number) => { 
  
  emojiNumber.text = String(c);//how can I have 0xA9 here instaed 169???
  emojiNumber.text = `index: ${c}, (${displayHex(emojisHex[c])})`;
  emoji.text = fixedFromCharCode(emojisHex[c]);
};

const assignMulti = (factor: number) => {
  multiview.getElementsByClassName("multi").forEach((el: TextElement) => {
    let index = Number(el.id)+(30*factor);
    el.text = fixedFromCharCode(emojisHex[index]);
  }); 
}

const n = emojisHex.length;
let counter = 0;
let mode = 0;
let factor = 0;


// multi could be sufficient
// SWITCHES VIEWMODE
viewButton.onclick = () => {
  mode++;
  mode %=2;
  modeText.text = mode === 0 ? "single view" : "multi view";
  //console.log(`mode: ${mode}`)
  multiview.style.display = mode === 0 ? "none" : "inline";
  single.style.display = mode === 1 ? "none" : "inline";
  loopSymbols();
}


function loopSymbols() {
  nextEmoji.onclick = () => {

    if (mode === 0) {

      if (counter < n) {
        counter++;
        let c = counter % n;
        assignEmoji(c);
      }
    } else {

      assignMulti(factor);
      factor++;
      factor %= Math.ceil(n / 30);
    };
  };
  prevEmoji.onclick = () => {
    if (mode === 0) {

      if (counter > 0) {
        counter--;
        let c = counter % n;
        assignEmoji(c);
      }
    } else {
      //TODO here is something wrong
      //needs 2 clicks to turn
      if (factor > 0) {
        factor--;
        assignMulti(factor);
        factor %= Math.ceil(n / 30);
      }
    };
  };
}


const emo = (key: string) => {
  let i= shortKeys.indexOf(key);
  return fixedFromCharCode(emojisHex[i]);
}

//console.logs from multi view
//Than can copy into element.text
(document.getElementsByClassName("multi") as any).forEach((el) => {
  el.onclick = () => {
    console.log(JSON.stringify(el.text));
  }  
});

emoji.onclick = () => {
  console.log(JSON.stringify(emoji.text));
}  




//TODO decide whether to keep different modes
//TODO check and really understand the polyfill
//TODO check why astral plane chars don't work. other format needed?
//TODO if all the >FFFF doesn't work, go with simply this '\u{XXXX}' format!!
//TODO, way to convert unicode into symbol directly in code-view? 

//TODO check logic in counters/clicks it#s somehow working, but not to 100% what I want



//TESTING SOME (TRIAL AND ERROR)THEORY_________________________________________________________________________________________

// console.log(encodeURIComponent('\u231a'))
// function fixedEncodeURI(str) {
//   return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
// }




// console.log("🌎".length)//2
// let encoded = (fixedEncodeURI("🌎"))
// let decoded = decodeURIComponent(encoded);
// console.log(decoded)
// console.log(encoded.toString())
// 
// function p2_idx_to_p1_idx (p2_idx, text) {
//   var p1_idx = p2_idx;
//   for (var i = 0; i < text.length && i < p2_idx; i++) {
//       var char_code = text.charCodeAt(i);
//       // check for the first half of a surrogate pair
//       if (char_code >= 0xD800 && char_code < 0xDC00) {
//           p1_idx -= 1;
//       }
//   }
//   return p1_idx;
// }
// 
// //@ts-ignore
// console.log('\x41\x42\x43')//ABC 
// console.log(encoded)//%F0%9F%8C%8E 
// console.log('\xf0\x9f\x8c\x8e')//ð
// 
// console.log('💩' === '\uD83D\uDCA9')// true
// console.log('💩')// ?????
// console.log('\uD83D\uDCA9')// ?????
// console.log('\u{D83D}\u{DCA9}')// ?????
// 
// 
// 
// console.log((0x1F315).toString(16))//1f315
// console.log('\xF0\x9F\x92\xA9') //ð©
// console.log('%F0%9F%92%A9')//%F0%9F%92%A9 
// console.log('\u{1F4A9}')// ?????
console.log("\u{D83D}\u{DCA9}")//??????
// 
// emoji.text=('\u{a9}')//syntax for U+A9 gets displayed
// emoji.text=('\u{1f600}')// gets not displayed
// emoji.text = "(\u{D83D}) + (\u{DCA9})"
console.log(emoji.text)//🍄 `
//console.log(decodeURIComponent(emoji.text))//Unhandled exception: URIError: Invalid CESU8 string.
//console.log(decodeURIComponent('🍄'))


function p2_idx_to_p1_idx (p2_idx, text) {
  var p1_idx = p2_idx;
  for (var i = 0; i < text.length && i < p2_idx; i++) {
      var char_code = text.charCodeAt(i);
      console.log(char_code.toString(16))//d83d \n dca9
      // check for the first half of a surrogate pair
      if (char_code >= 0xD800 && char_code < 0xDC00) {
          p1_idx -= 1;
      }
  }
  return p1_idx;
}


// function p1_idx_to_p2_idx (p1_idx, text) {
//   var p2_idx = p1_idx;
//   for (var i = 0; i < text.length && i < js_idx; i++) { //js_idx???
//       var char_code = text.charCodeAt(i);
//       // check for the first half of a surrogate pair
//       if (char_code >= 0xD800 && char_code < 0xDC00) {
//           p2_idx += 1;
//       }
//   }
//   return p2_idx;
// }
// console.log(p2_idx_to_p1_idx (1, '💩'))
let test = encodeURIComponent('💩')//This is U+1F4A9 encoded to %F0%9F%92%A9 
console.log(test)
console.log(decodeURIComponent('%F0%9F%92%A9' ))//������
//mushroom without "trailing"
console.log(encodeURIComponent('🍄'))//%F0%9F%8D%84
console.log(decodeURIComponent('%F0%9F%8D%84'))//������

//'🍄'// this is U+1F344
console.log('🍄')//������
p2_idx_to_p1_idx (2, '🍄')//UTF-16 surrogate pairs \ud83c\udf44
console.log('\u{FEFF}')//(BOM, byte order mark)would be noglyph, if wrong order
console.log('\u0FEFF\u0D83D\u0DCA9')// ࿯FඃD්9   
console.log('\u0FEFF\u0DCA9\u0D83D')//࿯F්9ඃD 
console.log('\uFEFF\uDCA9\uD83D')// ������ //F::: doesn't make a diff between order
console.log('\uFEFF\uD83D\uDCAD')// ������ 
//emoji.text = '💩'


/// Maybe check my array. I didn't have really converted to hex for >FFFF. IDIOT!!!
console.log(('\u{d83d}\u{dcad}'))
console.log(encodeURIComponent('\u{1F47B}'))//UTF-8 to HEX would be 'D8 3D DC 7B' im UF-16BE and '61 216 123 220' in UT-F16LE

const string2Hex = (string) => {
  return encodeURIComponent(string);
};

const hex2String = (hex)=> {
  return decodeURIComponent(hex.replace(/\\/g, "%"));
};

//Converting U+2600 to hex and back to string
let sunHex = string2Hex("☀");
console.log(`sunHex: ${sunHex}`);// sunHex: %E2%98%80 

let sunString = hex2String(sunHex);
console.log(sunString)// ☀ 


//Converting U+1F344 to hex and back to string
let mushroomHex = string2Hex('🍄');
console.log(`mushroomHex: ${mushroomHex}`);// mushroomHex: %F0%9F%8D%84 

let mushroomString = hex2String(mushroomHex);
console.log(mushroomString)// ������
console.log(hex2String("\ud83d\ude0d"))//this syntax would work for ASCII, but can't test here as codePointAt not working


function ConvertStringToHex(str) {
  var arr = [];
  for (var i = 0; i < str.length; i++) {
         arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + arr.join("\\u");
}

console.log(ConvertStringToHex('🍄'))//\ud83c\udf44 UTF-16/ F0 9F 8D 84	 UTF-8
console.log(hex2String('%F0%9F%8D%84'	))// ������

// //
// 'ABC'.codePointAt(0)                        // 65
// 'ABC'.codePointAt(0).toString(16)           // 41
// 
// '😍'.codePointAt(0)                         // 128525
// '\ud83d\ude0d'.codePointAt(0)               // 128525
// '\ud83d\ude0d'.codePointAt(0).toString(16)  // 1f60d
// 
// '😍'.codePointAt(1)                         // 56845
// '\ud83d\ude0d'.codePointAt(1)               // 56845
// '\ud83d\ude0d'.codePointAt(1).toString(16)  // de0d
// 
// 'ABC'.codePointAt(42)                       // undefined
console.log('\ud83d'.concat('\ude0d'))
// Initial string

// U+1E9B: LATIN SMALL LETTER LONG S WITH DOT ABOVE
// U+0323: COMBINING DOT BELOW
let str = '\u1E9B\u0323';//ẛ̣  WTF??
console.log(str)
console.log('\u1E9B')//ẛ
console.log('\u0323')// ̣ 
console.log('🍄'.length)//2

console.log('😍'.length)//2
console.log('😍'.codePointAt(0))//128525 returns codePoint(0)
console.log('😍'.codePointAt(1))//56845




