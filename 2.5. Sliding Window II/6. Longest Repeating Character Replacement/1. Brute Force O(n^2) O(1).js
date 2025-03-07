//! Brute Force
//*     - Try every possible substring of "s"
//*     - Track the number of chars that are NOT equal to the STARTING character
//*         - If s[j] !== s[i] and flips === 0, can't extend the substring anymore
//*             - So break out of the inner loop
//*         - Otherwise, we have a valid substring -> take the length
//! Edge Case
//*     - If we have a string "s" and k === s.length
//*     - Then we can return s.length immediately
//*         - Because we can flip the entire string
function characterReplacement(s, k) {
  //* We can flip the entire string s
  if (s.length === k) return s.length;

  let maxLength = 1;

  for (let i = 0; i < s.length; i++) {
    const char = s[i]; //* All of the substring chars must be "char"
    let flips = 0; //* If flips > k, substring is invalid

    for (let j = i; j < s.length; j++) {
      if (s[j] !== char) flips++;

      //* Substring is invalid; too many flips
      if (flips > k) break;

      //* Substring is valid; check if its length > best so far
      maxLength = Math.max(maxLength, j - i + 1);
    }
  }

  return maxLength;
}

console.log(characterReplacement("ABAB", 2)); //* 4
console.log(characterReplacement("AABABBA", 1)); //* 4
console.log(characterReplacement("ABCDEF", 0)); //* 1
console.log(characterReplacement("ABC", 3)); //* 3

//* Time: O(n^2) - We have nested loops, both of which scale with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
