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

// FUNCTIONS
// Formats array items text to 0x00000
let displayHex = (hex: number) => {
  return `0x${("00000" +hex.toString(16)).slice(-5)}`
};

//ASSIGNS EMOJIS
// single emoji
const assignEmoji = (c: number) => { 
  emojiNumber.text = String(c);
  emojiNumber.text = `index: ${c}, (${displayHex(emojisHex[c])})`;
  emoji.text = fixedFromCharCode(emojisHex[c]);
};

const assignMulti = (factor: number) => {
  // 30 elements, load next 30 on click
  multiview.getElementsByClassName("multi").forEach((el: TextElement) => {
    let index = Number(el.id)+(30*factor);
    el.text = fixedFromCharCode(emojisHex[index]);
  }); 
}

const n = emojisHex.length;
let counter = 0; // to switch to next item in single view
let mode = 0; // to switch between single/multiview
let factor = 0; // to multiply index for multiview


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
  // browse to next
  nextEmoji.onclick = () => {
    if (mode === 0) { // single view
      if (counter < n) {
        counter++;
        let c = counter % n;
        assignEmoji(c);
      }
    } else {
      assignMulti(factor); // multiview
      factor++;
      factor %= Math.ceil(n / 30);
    };
  };
  
  // browse to previous
  prevEmoji.onclick = () => {
    if (mode === 0) { // singleview
      if (counter > 0) {
        counter--;
        let c = counter % n;
        assignEmoji(c);
      }
    } else {
      //TODO here is something wrong
      //needs 2 clicks to turn
      if (factor > 0) { // multiview
        factor--;
        assignMulti(factor);
        factor %= Math.ceil(n / 30);
      }
    };
  };
}

// function for shortkeys
// currently not in use
const emo = (key: string) => {
  let i= shortKeys.indexOf(key);
  return fixedFromCharCode(emojisHex[i]);
}


// CONSOLE.LOG CLICKED ITEM
// then can copy into element.text

// from multi view
(document.getElementsByClassName("multi") as any).forEach((el) => {
  el.onclick = () => {
    console.log(JSON.stringify(el.text));
  }  
});
// from single view
emoji.onclick = () => {
  console.log(JSON.stringify(emoji.text));
}  




//TODO decide whether to keep different modes
//TODO check and really understand the polyfill
//TODO check why astral plane chars don't work. other format needed?
//TODO if all the >FFFF doesn't work, go with simply this '\u{XXXX}' format!!
//TODO, way to convert unicode into symbol directly in code-view? 

//TODO check logic in counters/clicks it#s somehow working, but not to 100% what I want

console.log(String.fromCharCode(0x1f600))//  
emoji.text = String.fromCharCode(0x1f600)//no glyph
console.log(fixedFromCharCode(0x1f600))//������
//String.fromCodePoint(0x1f600)//fromCodePoint not defined.... buhuhuuuuuu

