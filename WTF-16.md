## Encoding

To encode from code points to potentially ill-formed UTF-16, run these steps:

Let result be a sequence of 16-bit code units, initially empty.
For every code point P of the input, run these substeps:

* If P is a supplementary code point, append to result two 16-bit code units of values:
((P - 0x10000) >> 10) + 0xD800
((P - 0x10000) & 0x3FF) + 0xDC00

* Otherwise (P is a BMP code point), append to result a 16-bit code unit of value P.
Return result.
Note: If the input is restricted to Unicode text, this is identical to encoding to UTF-16 and the resulting sequence is well-formed in UTF-16.

If, on the other hand, the input contains a surrogate code point pair, the conversion will be incorrect and the resulting sequence will not represent the original code points.

This situation should be considered an error, but this specification does not define how to handle it. Possibilities include aborting the conversion, or replacing one of the surrogate code points of the pair with a replacement character.

## Decoding

To decode from potentially ill-formed UTF-16 to code points, run these steps:

Let result be a sequence of code points, initially empty.
**For every 16-bit code unit U of the input, run these substeps:**

* If U is a lead surrogate 16-bit code unit, U is not the last 16-bit code unit of the input, and the next 16-bit code unit of the input next is a trail surrogate 16-bit code unit, then consume next and **append** to result a code point of value 

**0x10000 + ((U - 0xD800) << 10) + (next - 0xDC00)**.

* Otherwise, append to result a code point of value U.

Return result.

Note: By construction, the resulting sequence does not contain a surrogate code point pair.

***Note: If the input is well-formed in UTF-16, this is identical to decoding UTF-16 and the resulting sequence is Unicode text.***