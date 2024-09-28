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

//* Apply tabulation to avoid recursion overhead
//*     - We have 2D state (i, j) to track each string's progress
function isInterleave(s1, s2, s3) {
  //* String lengths don't match up
  if (s1.length + s2.length !== s3.length) return false;

  const n = s1.length;
  const m = s2.length;

  //* dp[n][m] = Whether or not we can contribute to s3 using first "i" chars of s1
  //* and first "j" chars of s2
  const dp = new Array(n + 1)
    .fill(false)
    .map(() => new Array(m + 1).fill(false));

  //* Always possible to make a string of length 0
  dp[0][0] = true;

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (j === 0 && i > 0) {
        //* Character in s1 matches character in s3
        dp[i][j] = dp[i - 1][j] && s1[i - 1] === s3[i + j - 1];
      } else if (i === 0 && j > 0) {
        //* Character in s2 matches character in s3
        dp[i][j] = dp[i][j - 1] && s2[j - 1] === s3[i + j - 1];
      } else if (i > 0 && j > 0) {
        dp[i][j] =
          (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) || //* s1 matches
          (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]); //* s2 matches
      }
    }
  }

  return dp[n][m];
}

console.log(isInterleave("aa", "bc", "abac")); //* True
console.log(isInterleave("aaaaa", "", "aaaaa")); //* True
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac")); //* True
console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc")); //* False
console.log(isInterleave("", "", "")); //* True
console.log(isInterleave("aba", "bab", "abbaab")); //* True

//* Time: O(n * m) - We are caching the results of each subproblem
//* There are "n" possible indices for s1 and "m" possible indices for s2
//* So using the rule of product we get n * m unique state

//* Space: O(n * m) - Since there are n * m unique states, in the worst case, we have n * m unique keys/values
