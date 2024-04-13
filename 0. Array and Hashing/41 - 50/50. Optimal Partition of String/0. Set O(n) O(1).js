//* Use a set to track the characters we currently have in the substring
//* We don't want to allow duplicates, so using a set makes sense
//* Use the set to check if we already have that character in the substring
//* If we DO, then just increment substrings and clear the set for the next substring (clear() takes O(1) time)
function optimalPartionOfString(s) {
  let substrings = 1;

  const usedChars = new Set();
  let i = 0;

  while (i < s.length) {
    //* Still able to add this character to the substring
    if (!usedChars.has(s[i])) {
      usedChars.add(s[i]);
      i++;
    } else {
      substrings++;
      usedChars.clear();
    }
  }

  return substrings;
}

console.log(optimalPartionOfString("abacaba")); //* 4
console.log(optimalPartionOfString("sssss")); //* 5
console.log(optimalPartionOfString("x")); //* 1
console.log(optimalPartionOfString("ababababab")); //* 5
console.log(optimalPartionOfString("xyzzyx")); //* 2
console.log(optimalPartionOfString("aaa")); //* 3
console.log(optimalPartionOfString("abc")); //* *

//* Time: O(n) - The time taken scales with the input size
//* There may be more than "n" iterations since it is a while loop and we don't ALWAYS increment "i"
//* But the BASE number of iterations scales with "n" linearly

//* Space: O(26) -> O(1) - We can't have more than 26 characters in the set
//* We are limited to lowercase alphabetical characters
//* So O(26) simplifies to O(1)
