
import document from "document";
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

function getSurrogates (len2, text) {
  var lenS = len2;
  for (var i = 0; i < text.length && i < len2; i++) {
      var charCode = text.charCodeAt(i);
      console.log(charCode.toString(16))//d83d \n dca9
      // check for the first half of a surrogate pair
      if (charCode >= 0xD800 && charCode < 0xDC00) {
          lenS -= 1;
      }
  }
  return lenS;
}

//original :mushroom: correct pair
console.log(`original: ${getSurrogates(2, "🍄")}`)// ud83c udf44 - 

//log, when mushroom placed in svg <text>
console.log(emoji.text)// 🍄`i - 

// log when click on emoji from svg : "ߍ䠣"
// this varies in the second surrogate for each build
// but shows mushroom on display!!!
getSurrogates(2,"ߍ䠣")// u7cd u4823
getSurrogates(2,"ߍ䰙")// u7cd u4c19
getSurrogates(2,"ߍ䀙")// u7cd u4019

//emoji.text = ('\u7cd4\u4823') grrr.....
console.log("I \u2661 Javascript") // I ♡ Javascript  not included


