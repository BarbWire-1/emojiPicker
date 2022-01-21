import { hueToHex } from "blockly";
import document from "document";
import {emojis, emojisHex} from "./fitmoji";

const emojiCode = document.getElementById("emojiCode");
const emoji = document.getElementById("emoji");
const nextEmoji = document.getElementById("nextEmoji");



// CLICK THROUGH EMOJIS
//const n = emojis.length;
const n = emojisHex.length;
nextEmoji.text = "⏩";
console.log(n)
let counter = 0;

nextEmoji.onclick = () => {
    let c = counter % n;
    
    // assign values from array
    // emojiCode.text = emojis[c][0];
    // emoji.text = emojis[c][1];
    
    emojiCode.text = String(emojisHex[c]);//how can I have 0xA9 here instaed 169???
    emoji.text = String.fromCharCode(emojisHex[c])
   
    
    counter++;
};
// writes directly from hex :)
//emoji.text = String.fromCharCode(0x231A)



    
   



