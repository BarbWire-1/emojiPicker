
import document from "document";
import {emojisHex, shortKeys} from "./fitmoji";
import { fixedFromCharCode } from "./readUTF";

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
  multiview.getElementsByClassName("multi").forEach((el) => {
        
    let index = Number(el.id)+(30*factor);
    el.text = fixedFromCharCode(emojisHex[index]);
  }); 
}

const n = emojisHex.length;
let counter = 0;
let mode = 0;
let factor = 0;


// SWITCHES VIEWMODE
viewButton.onclick = () => {
  mode++;
  mode %=2;
  modeText.text = mode === 0 ? "single view" : "multi view";
  //console.log(`mode: ${mode}`)
  multiview.style.display = mode === 0 ? "none" : "inline";
  single.style.display = mode === 1 ? "none" : "inline";
// CLICK THROUGH EMOJIS 
// single view

  
  loopSymbols();
}
//console.log(document.getElementById("test").text = "\u{1f36b}");
console.log("⭐")
console.log("⭐".length)//1
console.log("🍩")
console.log("🍩".length)//2
console.log('\u{1F647}')//NOT WORKING
//emoji.text= '\u{1F647}'
//emoji.text = ":capricorn:"

const emo = (key: string) => {
  let i= shortKeys.indexOf(key);
  return fixedFromCharCode(emojisHex[i]);
}

console.log(emo(":copyright:"))


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
//emoji.text = fixedFromCharCode(0x1F372);

//TODO check and really understand the polyfill
//TODO check why astral plane chars don't work. other format needed?
//TODO if all the >FFFF doesn't work, go with simply this '\u{XXXX}' format!!
// TODO, way to convert unicode into symbol directly in code-view? 

//TODO check logic in counters/clicks it#s somehow working, but not to 100% what I want

// THIS DOESN'T WORK ON USES???
// multiview.getElementsByClassName("multi").forEach((el) => {
//   let index = Number(el.id);
//   el.text = fixedFromCharCode(emojisHex[index]);
//   
//   //console.log(`id${el.id}`);
//   //console.log(displayHex(emojisHex[index]));
// }); 
    
   



