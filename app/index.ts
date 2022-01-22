
import document from "document";
import {emojisHex} from "./fitmoji";

const emojiNumber = document.getElementById("emojiCode");
const emoji = document.getElementById("emoji");
const nextEmoji = document.getElementById("nextEmoji");
const lastEmoji = document.getElementById("lastEmoji");

//TODO check this function (not working)
//https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B10000_to_U.2B10FFFF
function fixedFromCharCode (codePoint) {
  if (codePoint > 0xFFFF) {
      codePoint -= 0x10000;
      return String.fromCharCode(0xD800 + (codePoint >> 10), 0xDC00 + (codePoint & 0x3FF));
  }
  else {
      return String.fromCharCode(codePoint);
  }
}
console.log(fixedFromCharCode(0x1F372))//returns "?????" - NOT "no glyph"


// CLICK THROUGH EMOJIS
const n = emojisHex.length;
nextEmoji.text = "⏩";
lastEmoji.text = "⏪";
console.log(n)
let counter = 0;

const assignEmoji = (c) => {
  emojiNumber.text = String(c);//how can I have 0xA9 here instaed 169???
  emoji.text = String.fromCharCode(emojisHex[c]);
};

nextEmoji.onclick = () => {
  if(counter<n) {
    let c = counter % n;
    counter++;
    assignEmoji(c)
  } else {
    return;
  };
};

lastEmoji.onclick = () => {
  if(counter>0) {
    counter--;
    let c = counter % n;
    assignEmoji(c);
  } else {
    return;
  };
};
//emoji.text = fixedFromCharCode(0x1F372);

//TODO check and understand the polyfill
//TODO how to print hexcode in text-format??? like 0xblahblah?
//TODO check why the others don't work. other format needed?



    
   



