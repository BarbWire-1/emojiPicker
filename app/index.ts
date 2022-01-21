
import document from "document";
import {emojisHex} from "./fitmoji";

const emojiNumber = document.getElementById("emojiCode");
const emoji = document.getElementById("emoji");
const nextEmoji = document.getElementById("nextEmoji");
const lastEmoji = document.getElementById("lastEmoji");


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

//TODO check and understand the polyfill
//TODO how to print hexcode in text-format??? like 0xblahblah?
//TODO check why the others don't work. other format needed?



    
   



