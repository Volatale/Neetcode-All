//* Splitting the array gets rid of any space characters
//* The only edge case we are left with is if the end of the string
function lengthOfLastWord(s) {
  const words = s.split(" ");

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

//* Time: O(n) - The time taken for the internal split() scales with the length of the input
//* We have to traverse from the start of the string to the end of the string to get all of the characters

//* Space: O(k) - The space used by the split array scales with the number of words in the array
