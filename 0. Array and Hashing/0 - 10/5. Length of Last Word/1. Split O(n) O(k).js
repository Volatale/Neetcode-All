//* Split the array up into empty strings, and words
//* Then, iterate from right to left and return the length of the first non-empty word
function lengthOfLastWord(s) {
  //* Get an array of all of the words, excluding the white space
  const words = s.split(" ");

  //* Iterate from back to front and return the length of the first actual word
  for (let i = words.length - 1; i >= 0; i--) {
    if (words[i].length !== 0) return words[i].length;
  }
}

console.log(lengthOfLastWord("Hello World")); // 5
console.log(lengthOfLastWord("Sonic the Hedgehog")); // 8
console.log(lengthOfLastWord("Mario")); // 5
console.log(lengthOfLastWord("a")); // 1
console.log(lengthOfLastWord("   fly me   to   the moon  ")); // 4
console.log(lengthOfLastWord("fly with me to the moon ")); // 4
console.log(lengthOfLastWord("luffy is still joyboy")); // 6

//* Time: O(n) - The time taken to split scales with the length of the input
//* The time complexity of the loop scales with "k", but k <= n

//* Space: O(k) - The space used by the split array scales with the number of words in the array
