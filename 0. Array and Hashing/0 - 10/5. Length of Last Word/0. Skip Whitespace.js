//* Splitting the array gets rid of any space characters
//* The only edge case we are left with is if the end of the string
function lengthOfLastWord(s) {
  let charCount = 0;
  let index = s.length - 1;

  //* We are guaranteed to have at least 1 word, so this ignores the whitespace at the end -->
  while (s[index] === " ") {
    index--;
  }

  for (let i = index; i >= 0; i--) {
    if (s[i] === " " && charCount > 0) return charCount;
    charCount++;
  }

  //! If the input was "a" or something similar, the early return above won't work as intended
  return charCount;
}

console.log(lengthOfLastWord("Hello World")); // 5
console.log(lengthOfLastWord("Sonic the Hedgehog")); // 8
console.log(lengthOfLastWord("Mario")); // 5
console.log(lengthOfLastWord("a")); // 1
console.log(lengthOfLastWord("   fly me   to   the moon  ")); // 4
console.log(lengthOfLastWord("fly with me to the moon ")); // 4
console.log(lengthOfLastWord("luffy is still joyboy")); // 6

//* Time: O(n) - The time taken for the internal split() scales with the length of the input
//* We have to traverse from the start of the string to the end of the string to get all of the characters

//* Space: O(1) - The space used by the split array scales with the number of words in the array
