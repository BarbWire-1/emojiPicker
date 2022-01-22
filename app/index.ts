
import document from "document";
import {emojisHex} from "./fitmoji";
import { fixedFromCharCode } from "./readUTF";

// containers
const buttons = document.getElementById("buttons");
const single = document.getElementById("single");
const multiview = document.getElementById("multiview");

// search in containers
const emojiNumber = single.getElementById("emojiCode");
const emoji = single.getElementById("emoji");
const viewButton = buttons.getElementById("viewButton");
const modeText = buttons.getElementById("viewMode")
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
let mode = 0;


// SWITCHES VIEWMODE
viewButton.onclick = () => {
  mode++;
  mode %=2;
  modeText.text = mode === 0 ? "single view" : "multi view";
  console.log(`mode: ${mode}`)

// CLICK THROUGH EMOJIS 
// single view

  
  nextEmoji.onclick = () => {
    if (mode === 0) {
      if(counter<n) {
        
        counter++;
        let c = counter % n;
        assignEmoji(c)
    } else {
      //multiview needs 30 per click
      return;
    };
  };
  }
  lastEmoji.onclick = () => {
    if (mode === 0) {
      if(counter>0) {
        counter--;
        let c = counter % n;
        assignEmoji(c);
    } else {
      //multiview needs 30 per click
      return;
    };
  };
}
}
console.log(`mode: ${mode}`)

//emoji.text = fixedFromCharCode(0x1F372);

//TODO check and really understand the polyfill
//TODO check why astral plane chars don't work. other format needed?
//TODO1 LOGIC FOR MULTIVIEW!!!

// THIS DOESN'T WORK ON USES???
multiview.getElementsByClassName("multi").forEach((el) => {
  let index = Number(el.id);
  el.text = fixedFromCharCode(emojisHex[index]);
  
  //console.log(`id${el.id}`);
  //console.log(displayHex(emojisHex[index]));
}); 
    
   



