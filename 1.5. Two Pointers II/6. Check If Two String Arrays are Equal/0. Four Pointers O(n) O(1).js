//* We are given two arrays of strings (each of which can be concatenated into another string)
//* The goal is to compare every character in each inner string to see if the "concatenated" strings are equal
//* We "could" use the array `join` method to combine the strings, however, we have another option
//* The inputs are string[], which means we can use a two pointer approach
//*     - The strings can be broken up into multiple strings
//* Note that the input arrays are not guaranteed to have the same length, so we can't rely on string comparisons
//*     - Instead, we need to rely on character comparisons
//! There is no need to compare the concatenated strings themselves
//*     - We can instead compare each character in a row
//* Compare two characters at a time (one in each string)
//*     - If at any point the comparison is false, then the concatenated strings cannot possibly be equal
//* To handle the comparisons, we can use two pointers to select the string in a string[]
//* Then, use two ADDITIONAL pointers to compare each character within that string
function arrayStringsAreEqual(word1, word2) {
  //* String pointers
  let w1 = 0;
  let w2 = 0;

  //* Character pointers
  let c1 = 0;
  let c2 = 0;

  while (w1 < word1.length && w2 < word2.length) {
    const currWord1 = word1[w1];
    const currWord2 = word2[w2];

    //* The characters don't match, so the strings are not equal
    if (currWord1[c1] !== currWord2[c2]) return false;

    if (c1 < currWord1.length - 1) {
      c1++; //* Move to the next character within this word
    } else {
      //* Move onto the next word
      w1++;
      c1 = 0;
    }

    if (c2 < currWord2.length - 1) {
      c2++;
    } else {
      w2++;
      c2 = 0;
    }
  }

  //* After all that, if the pointers made it to the end then both strings are equal
  return w1 === word1.length && w2 === word2.length;
}

console.log(arrayStringsAreEqual(["ab", "c"], ["a", "bc"])); //* True
console.log(arrayStringsAreEqual(["a", "cb"], ["ab", "c"])); //* False
console.log(arrayStringsAreEqual(["abc", "d", "defg"], ["abcddefg"])); //* True
console.log(arrayStringsAreEqual(["sonic"], [""])); //* False
console.log(arrayStringsAreEqual(["jas"], ["jes"])); //* False

//* Time: O(n + m) - Iterating through every character in all the strings scales with the total number of characters in both

//* Space: O(1) - The memory usage remains constant regardless of input size
