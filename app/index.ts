
import document from "document";
import {emojisHex} from "./fitmoji";
import { fixedFromCharCode } from "./readUTF";

// groups
const buttons = document.getElementById("buttons");
const single = document.getElementById("single");

// search in groups
const emojiNumber = single.getElementById("emojiCode");
const emoji = single.getElementById("emoji");
const nextEmoji = buttons.getElementById("nextEmoji");
const lastEmoji = buttons.getElementById("lastEmoji");


// BUTTONS
nextEmoji.text = "⏩";
lastEmoji.text = "⏪";

//FUNCTIONS
//Formats array items to 0x00000
let displayHex = (hex) => {return `0x${("00000" +hex.toString(16)).slice(-5)}`};

//ASSIGNS EMOJIS
const assignEmoji = (c) => { 
  
  emojiNumber.text = String(c);//how can I have 0xA9 here instaed 169???
  emojiNumber.text = `index: ${c}, (${displayHex(emojisHex[c])})`;
  emoji.text = fixedFromCharCode(emojisHex[c]);
};

const n = emojisHex.length;
let counter = 0;






// CLICK THROUGH EMOJIS 
// 1 per single view + index and hexcode
// 30 per multi view


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

//TODO check and really understand the polyfill
//TODO check why astral plane chars don't work. other format needed?


// THIS DOESN'T WORK ON USES???
// multiview.getElementsByClassName("multi").forEach((el) => {
//   let index = Number(el.id);
//   el.text = fixedFromCharCode(emojisHex[index]);
//   
//   //console.log(`id${el.id}`);
//   //console.log(displayHex(emojisHex[index]));
// }); 
    
   



