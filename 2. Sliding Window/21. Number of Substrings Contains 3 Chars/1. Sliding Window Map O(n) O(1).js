//* Use a sliding window approach to cut down on time taken
//* A map can track the frequency of characters
//* While chars.size === 3, we know we have all 3 characters
//* Starting from "end", we know that each remaining character creates a new valid substring
//* "aabc" -> end = 2 to be valid: s.length (4) - end (2) = 2
//* The substrings wihtin this window are:
//*     "aabc"
//*     "abc"
//* After, decrement the leftmost character
//* Remove it from the map if its occurrences === 0
//* Then increment start -> rinse and repeat
function numberOfSubstringsContainingThreeChars(s) {
  //* Sliding Window
  let start = 0;
  let end = 0;

  let substrings = 0;

  const chars = new Map(); //* Track the frequency of characters

  while (end < s.length) {
    chars.set(s[end], (chars.get(s[end]) || 0) + 1); //* Add an occurrence

    while (chars.size === 3) {
      //* Starting at end, each of the remaining characters can form a new substring
      substrings += s.length - end;

      chars.set(s[start], chars.get(s[start]) - 1); //* Remove an occurrence

      if (chars.get(s[start]) === 0) {
        chars.delete(s[start]);
      }

      start++;
    }

    end++;
  }

  return substrings;
}

console.log(numberOfSubstringsContainingThreeChars("abcabc")); //* 10
console.log(numberOfSubstringsContainingThreeChars("aabc")); //* 2
console.log(numberOfSubstringsContainingThreeChars("aaacb")); //* 3
console.log(numberOfSubstringsContainingThreeChars("abc")); //* 1
console.log(numberOfSubstringsContainingThreeChars("abcc")); //* 2

//* Time: O(n) - The time taken scales with the input size
//* We are using a sliding window which allows us to remove the multiplicative nature of nested loops

//* Space: O(1) - The map contains at most 3 elements at once
//* O(3) simplifies to O(1)
