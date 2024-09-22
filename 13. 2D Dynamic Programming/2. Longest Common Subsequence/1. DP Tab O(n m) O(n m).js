//* A subsequence is just an ordered subset
//*     - For a subset, we have a CHOICE whether or not to include the current element
//*     - Given this logic, we just keep track of two positions (one for each input)
//* There are 2 cases to handle:
//*     - If both characters match, just progress both indices at once
//*     - Otherwise, take progress them both individually, and take the MAXIMUM of both paths

//* Apply tabulation to avoid recursion overhead
//*     - dp[i][j] = Longest Common Substring ending at index i (text1) and index j (text2)
function longestCommonSubsequence(text1, text2) {
  if (text1.length === 0 || text2.length === 0) return 0;

  const n = text1.length;
  const m = text2.length;

  //* dp[i][j] = Longest Common Substring ending at index i (text1) and index j (text2)
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0; //* Indexing would lead us out of bounds
      } else if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1; //* Take whatever we had + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); //* Take the maximum of both paths
      }
    }
  }

  return dp[n][m];
}

console.log(longestCommonSubsequence("abcde", "ace")); //* 3
console.log(longestCommonSubsequence("aaaaa", "a")); //* 1
console.log(longestCommonSubsequence("abc", "abc")); //* 3
console.log(longestCommonSubsequence("xyz", "huj")); //* 0
console.log(
  longestCommonSubsequence(
    "abcdefghijklmnopqrstuvwxyz",
    "zyxwutsrqrqponmlkjihfedcba"
  )
); //* 2

//* Time: O(n * m) - We are caching the results of each subproblem
//* There are n possible indices for text1 and m possible indices for text2
//* Since we have two non-constant parameters, we get n * m possible unique states

//* Space: O(n * m) - Since there are n * m unique states, there could also be an equal number of keys/values
