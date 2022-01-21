import document from "document";
import {emojis} from "./fitmoji";

const emojiCode = document.getElementById("emojiCode");
const emoji = document.getElementById("emoji");
const nextEmoji = document.getElementById("nextEmoji");


// CLICK THROUGH EMOJIS
const n = emojis.length;
nextEmoji.text = "⏩";

let counter = 0;

nextEmoji.onclick = (evt) => {
    let c = counter % n;
    
    //assign values from array
    emojiCode.text = emojis[c][0];
    emoji.text = emojis[c][1];
  
    counter++;
};

//writes directly from hex :)
console.log(String.fromCharCode(0x5448))
emoji.text = String.fromCharCode(0x2b55)



    
   



