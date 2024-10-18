//* Count the frequency of each character
//* Then we need a way to track each unique frequency count
//*     - Use a set for this purpose
//* Iterate through the frequency array
//!     - Skip any characters with a frequency of 0
//*         - We can't delete 0 characters
//*     - If the current frequency already exists in the set
//*         - Keep decrementing the frequency of this character until it DOESN'T
//*         - Each decrement also counts as a deleted character
//*     - Add the frequency to the set
//! The logic works because we don't care which characters are deleted
//*     - The main goal is to simply have each character be a unique frequency
//! Multiple characters can have a frequency of 0, however
//*     - Hence, this is another reason for skipping 0 frequency characters
function minDeletions(s) {
  const freqArr = new Array(26).fill(0); //* Tracks the frequency of each character
  const usedFreq = new Set(); //* Tracks each unique frequency
  let deletedChars = 0;

  //* Get the frequency of each character
  for (let char of s) {
    freqArr[char.charCodeAt(0) - 97]++;
  }

  //* Iterate over every
  for (let freq of freqArr) {
    //* Decrement the frequency until it doesn't overlap
    while (freq > 0 && usedFreq.has(freq)) {
      freq--;
      deletedChars++; //* Each decrement is also a deletion
    }

    usedFreq.add(freq); //* Freq is either unique or 0
  }

  return deletedChars;
}

console.log(minDeletions("aaaa")); //* 0
console.log(minDeletions("aab")); //* 0
console.log(minDeletions("aaabbbcc")); //* 2
console.log(minDeletions("ceabaacb")); //* 2

//* Time: O(n) - It takes O(n) to get the frequency for every character
//* Then it takes O(26) -> O(1) to process each frequency
//* There are only 26 characters in the lowercase alphabet

//* Space: O(n) - There are only 26 characters in the alphabet
//* Thus, the freqArr can only ever grow to 26 length
//* The set can potentially hold up to "n" frequencies
