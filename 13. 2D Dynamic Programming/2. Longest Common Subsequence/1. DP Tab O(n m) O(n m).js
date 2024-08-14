//* Start from an empty string string
//* Apply Tabulation instead of Memoization

//* Recurrence Relation: if i || j === 0, return 0
//* If text1[i-1] === text2[j-1] return LCS + 1, progress both states at once
//* Else return Math.max(LCS(i-1, j), LCS(i, j-1))
function longestCommonSubsequence(text1, text2) {
  const n = text1.length;
  const m = text2.length;

  //* dp[i][j] = LCS from 0 to "i" and 0 to "j"
  const dp = new Array(n + 1).fill(0).map(() => new Array(m).fill(0));

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (i === 0 || j === 0) {
        //* Base Case; string has 0 length, so LCS = 0
        dp[i][j] = 0;
      } else if (text1[i - 1] === text2[j - 1]) {
        //* Characters match; progress both indexes
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        //* Characters don't match; take the maximum of both
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[n][m];
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

//* Time: O(n * m) - We have two non-constant variables, i and j
//* Which means there are (n + 1) rows and (m + 1) columns
//* The number of states scales with n * m

//* Space: O(n * m) - The number of states scales with n * m
//* The depth of the recursion tree scales with max(n, m)
//* Where "n" is text1 length and "m" is text2 length
//* In the worst case, no characters match at all
