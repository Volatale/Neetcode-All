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

  //* We only have 3 different characters; use Base 26 -> Base 3, so [0] = "a" etc
  const chars = new Array(3).fill(0);

  while (end < s.length) {
    chars[s[end].charCodeAt(0) - 97]++; //* Add an occurrence

    while (chars[0] > 0 && chars[1] > 0 && chars[2] > 0) {
      substrings += s.length - end;
      chars[s[start++].charCodeAt(0) - 97]--; //* Remove an occurrence
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
