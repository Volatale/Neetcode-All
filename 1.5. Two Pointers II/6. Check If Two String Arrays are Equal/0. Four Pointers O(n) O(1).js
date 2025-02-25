//* Simply iterate through each character in every word
//* There is no need to actually build the strings at all
//* We need two pointers to track the progress through each string array
//* But we also need two MORE pointers to track the progress WITHIN each word (word[i])
//*     - If the char pointer is at the end of word, reset the pointer and move to the next word
//*     - Otherwise, just increment to move onto the next character
//* Ultimately, the goal is to compare the characters that each pointer points to
//*     - If they are equal, then everything is fine, check the rest of the characters
//*     - If they are NOT equal, the strings cannot be equal so return false
function arrayStringsAreEqual(word1, word2) {
  let p1 = 0;
  let p2 = 0; //* Character Pointers
  let w1 = 0;
  let w2 = 0; //* Word Pointers

  while (w1 < word1.length && w2 < word2.length) {
    const currWord1 = word1[w1];
    const currWord2 = word2[w2];

    //* The characters don't match
    if (currWord1[p1] !== currWord2[p2]) return false;

    if (p1 < currWord1.length - 1) {
      p1++;
    } else {
      //* Move onto the next word
      p1 = 0;
      w1++;
    }

    if (p2 < currWord2.length - 1) {
      p2++;
    } else {
      //* Move onto next word
      p2 = 0;
      w2++;
    }
  }

  //* If both pointers made it to the end, the strings were equal
  return w1 === word1.length && w2 === word2.length;
}

console.log(arrayStringsAreEqual(["ab", "c"], ["a", "bc"])); //* true
console.log(arrayStringsAreEqual(["a", "cb"], ["ab", "c"])); //* false
console.log(arrayStringsAreEqual(["abc", "d", "defg"], ["abcddefg"])); //* true
console.log(arrayStringsAreEqual(["sonic"], [""])); //* false
console.log(arrayStringsAreEqual(["jas"], ["jes"])); //* false

//* Time: O(n + m) - We have to iterate through every character in every string in both arrays

//* Space: O(1) - The memory usage remains constant regardless of input size
