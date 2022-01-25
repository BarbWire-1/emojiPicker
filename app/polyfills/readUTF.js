

//tried as variation to outcomment part above
//https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B10000_to_U.2B10FFFF
// THIS DOESN'T SHOW ANYTHING IN DISPLAY
// console.log returns "?????"
function fixedFromCharCode (codePoint) {
  if (codePoint > 0xFFFF) {
      codePoint -= 0x10000;
      //difference to above is the missing (codePoint % 0x400), instead (codePoint & 0x3FF)
      return String.fromCharCode(0xD800 + (codePoint >> 10), 0xDC00 + (codePoint & 0x3FF));
  }
  else {
      return String.fromCharCode(codePoint);
  }
}
//console.log(fixedFromCharCode(0x1F38A))//returns "?????" - NOT "no glyph"
// 






export { fixedFromCharCode}
//WHY is the codePointAt not working???  