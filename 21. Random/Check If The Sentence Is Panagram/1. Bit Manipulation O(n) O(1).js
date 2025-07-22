//* A "pangram" is a sentence where every letter of the English alphabet appears AT LEAST once
//* "Appearing once" implies we need to check the frequency of all of the characters
//* Since there can only ever be at most 26 unique characters (there are 26 lowercase English characters)
//* We could use a bit manipulation approach (using a 32-bit integer)
//*     - A 0 bit means the character was not found
//*     - A 1 bit means the character was found
//* At the very end, we can either check for 26 set bits in a row (from right to left)
//* Or, we can use Brian Kernighan's Algorithm and simply check for 26 set bits in general
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

  //* Use Brian Kernighan's algorithm to count set bits (there should be 26)
  return countSetBits(chars) === 26;
}

function countSetBits(n) {
  let setBits = 0;

  while (n !== 0) {
    n &= n - 1;
    setBits++;
  }

  return setBits;
}

console.log(checkIfPangram("abcdefghijklmnopqrstuvwxyz"));
console.log(checkIfPangram("qwerty"));
console.log(checkIfPangram("thequickbrownfoxjumpsoverthelazydog"));

//* Time: O(n) - The time taken scales with the length of the input

//* Space: (1) - The memory usage remains constant regardless of the input size
//* We are only using 32-bit integers for the purposes of bit manipulation
