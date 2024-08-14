//* When we apply tabulation, we only need the previous set of results
//* The DP array represents the PREVIOUS set of results
//* The newDP array represents the CURRENT set of results
//*     - We essentially have two rows, previous and current
//! We can still get the DIAGONAL (up-left) result, just in a different manner
//*     - "dp" represents the PREVIOUS row
//*     - So when we do newDP[j] = dp[j - 1] + 1
//*         - "j" is the current position
//*         - dp[j - 1] gives us the DIAGONAL result
//*             - So it is basically the same as progressing both i and j simultaneously
function longestCommonSubsequence(text1, text2) {
  const n = text1.length;
  const m = text2.length;

  //* Stores LCS for the PREVIOUS row
  let dp = new Array(n + 1).fill(0);

  for (let i = 0; i <= n; i++) {
    //* Stores LCS for the CURRENT row (i)
    const newDP = new Array(m + 1).fill(0);

    for (let j = 0; j <= m; j++) {
      if (i === 0 || j === 0) {
        //* Base Case
        newDP[j] = 0;
      } else if (text1[i - 1] === text2[j - 1]) {
        //* Characters match, take the previous result
        newDP[j] = dp[j - 1] + 1;
      } else {
        //* Characters don't match, take the maximum
        newDP[j] = Math.max(newDP[j - 1], dp[j]);
      }
    }

    dp = newDP;
  }

  return dp[m];
}

console.log(longestCommonSubsequence("abcde", "ace")); //* 3
console.log(longestCommonSubsequence("abc", "abc")); //* 3
console.log(longestCommonSubsequence("abc", "def")); //* 0
console.log(
  longestCommonSubsequence(
    "abcdefghijklmnopqrstuvwxyz",
    "zyxwutsrqrqponmlkjihfedcba"
  )
); //* 2

//* Time: O(n * m) - Our DP has two dimensions (text1 length and text2 length)
//* So we have two non-constant variables to deal with
//* We perform a nested for loop that scales with n and m respectively

//* Space: O(n + m) - The "dp" array has "n" length
//* Within each outer loop, we create an array of "m" length
//* "n" and "m" do not necessarily have the same size
