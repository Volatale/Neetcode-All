//* In a brute force manner, we could generate every possible substring
//* There is no need to actually track the unique characters within the substring, however
//! All we have to do is compare the ASCII char codes of the current and previous characters
//*     - If s[i-1].charCodeAt(0) !== s[i].charCodeAt(0), then they are not equal
//* Why does this work? Because each character maps to a unique char code (ASCII, Unicode Code Point etc)

function maxPower(s) {
  //* A string that only has a length of 1 has a power of 1
  if (s.length <= 1) return s.length;

  //* The minimum power of a string is 1 (a substring of length 1)
  let maxPower = 1;

  //* Get the power of every (valid) substring
  for (let i = 0; i < s.length - 1; i++) {
    for (let j = i + 1; j < s.length; j++) {
      if (s[j - 1].charCodeAt(0) !== s[j].charCodeAt(0)) break;

      //* j - i + 1 gives us the length of the substring
      maxPower = Math.max(maxPower, j - i + 1);
    }
  }

  return maxPower;
}

console.log(maxPower("leetcode")); //* 2
console.log(maxPower("abcde")); //* 1
console.log(maxPower("wwwww")); //* 5
console.log(maxPower("abbcccddddeeeeedcba")); //* 5

//* Time: O(n^2) - We are generating every possible substring
//* There are (n * (n + 1) / 2) substrings in total

//* Space: O(1) - The memory usage remains constant regardless of input size
