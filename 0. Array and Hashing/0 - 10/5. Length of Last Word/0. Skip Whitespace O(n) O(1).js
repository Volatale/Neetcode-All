//* We only care about the final word in the string
//* Splitting the string and removing the white space "would" work, but it is slow
//* Instead, we can simply iterate from right to left and find the first non-whitespace character
//* Then, since we know we have a "valid" word, we can simply count the number of characters until the next whitespace character
function lengthOfLastWord(s) {
  let length = 0;
  let index = s.length - 1;

  //* Iterate right to left and find the first non-empty string
  while (s[index] === " ") {
    index--;
  }

  //* Count the number of characters in this word
  while (index >= 0 && s[index] !== " ") {
    length++;
    index--;
  }

  return length;
}

console.log(lengthOfLastWord("Hello World")); //* 5
console.log(lengthOfLastWord("Sonic the Hedgehog")); //* 8
console.log(lengthOfLastWord("Mario")); //* 5
console.log(lengthOfLastWord("a")); //* 1
console.log(lengthOfLastWord("   fly me   to   the moon  ")); //* 4
console.log(lengthOfLastWord("fly with me to the moon ")); //* 4
console.log(lengthOfLastWord("luffy is still joyboy")); //* 6

//* Time: O(n) - The time taken scales with the length of the string
//* In the worst case, we iterate through the entire input (if the entire string is 1 word)

//* Space: O(1) - THe memory usage remains constant regardless of input size
