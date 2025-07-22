//* A "pangram" is a sentence where every letter of the English alphabet appears AT LEAST once
//* "Appearing once" implies we need to check the frequency of all of the characters
//* Since there can only ever be at most 26 unique characters (there are 26 lowercase English characters)
//* We could use a bit manipulation approach (using a 32-bit integer)
//*     - A 0 bit means the character was not found
//*     - A 1 bit means the character was found
//* At the very end, we can either check for 26 set bits in a row (from right to left)
//* In binary, a power of two always has a SINGLE set bit
//* Since there are 26 individual characters, we can completely avoid the need to count the number of set bits
//* We can use the equation ((1 << 26) - 1) to get a string of 26 set bits
//*     - Compare the result with this value
function checkIfPangram(sentence) {
  //* There aren't even 26 characters to check
  if (sentence.length < 26) return false;

  //* 32-bit integer used to check for character existence
  let chars = 0b0000;

  //* Set the corresponding bits ([0-25]) when the corresponding char is found ([a-z])
  for (let i = 0; i < sentence.length; i++) {
    const charCode = sentence[i].charCodeAt(0);
    chars |= 1 << (charCode - 97);
  }

  //* Check if all 26 set bits (0 to 25) are set
  return chars === (1 << 26) - 1;
}

console.log(checkIfPangram("abcdefghijklmnopqrstuvwxyz")); //* True
console.log(checkIfPangram("qwerty")); //* False
console.log(checkIfPangram("thequickbrownfoxjumpsoverthelazydog")); //* True

//* Time: O(n) - The time taken scales with the length of the input

//* Space: (1) - The memory usage remains constant regardless of the input size
//* We are only using 32-bit integers for the purposes of bit manipulation
