//* This problem is very similar to Word Break
//*     - Except we explicitly have two strings to take characters from instead of a dictionary
//* The |n - m| <= 1 can be ignored entirely
//!     - Just take substrings of length 1 (individual characters)
//* Essentially all we have to do is consume every character in both strings
//*     - If we manage to do that, s3 is an interleaving string
//* If the character from s1 won't work, try the character from s2
//*     - If neither work, it is impossible to form s3
//* We cannot use "future" characters until the state has transitioned that far
//! Ensure that if we have consumed all of one string, that we don't use any more characters
//*     - Otherwise we'd be going out of bounds
//* sN[i + j] gives us the current position in s3
function isInterleave(s1, s2, s3) {
  function findInterleaving(i, j) {
    //* Base Case: Consumed both s1 and s2 and matched s3 completely
    if (i + j === s3.length) {
      return i === s1.length && j === s2.length;
    }

    //* Case 1: Match current character of s1 to s3
    if (i < s1.length && s1[i] === s3[i + j] && findInterleaving(i + 1, j)) {
      return true;
    }

    //* Case 2: Match current character of s2 to s3
    if (j < s2.length && s2[j] === s3[i + j] && findInterleaving(i, j + 1)) {
      return true;
    }

    //* Neither of the characters match
    return false;
  }

  //* String lengths don't match up
  if (s1.length + s2.length !== s3.length) return false;

  return findInterleaving(0, 0);
}

console.log(isInterleave("aa", "bc", "abac")); //* True
console.log(isInterleave("aaaaa", "", "aaaaa")); //* True
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac")); //* True
console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc")); //* False
console.log(isInterleave("", "", "")); //* True
console.log(isInterleave("aba", "bab", "abbaab")); //* True

//* Time: O(2^(n + m)) - At each step, we have two decisions to make
//* Either take the character from s1 or the character from s2
//* The depth of the recursion tree scales with the length of BOTH strings

//* Space: O(n + m) - The depth of the recursion tree scales with the length of both strings
//* If s1 is 5 length and s2 is 6 length, we could consume all of s1
//* But still have all of s2 left to process (5 + 6 = 11)
