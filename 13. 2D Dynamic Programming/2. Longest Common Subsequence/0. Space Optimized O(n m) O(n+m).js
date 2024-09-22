//* A subsequence is just an ordered subset
//*     - For a subset, we have a CHOICE whether or not to include the current element
//*     - Given this logic, we just keep track of two positions (one for each input)
//* There are 2 cases to handle:
//*     - If both characters match, just progress both indices at once
//*     - Otherwise, take progress them both individually, and take the MAXIMUM of both paths

//* Apply tabulation to avoid recursion overhead
//*     - dp[i][j] = Longest Common Substring ending at index i (text1) and index j (text2)

//* We can optimize the space usage of the algorithm
//*     - dp[i][j] = max(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]): now remove the i state
//!         - dp[][j] = max(dp[][j-1], dp[][j])
//!         - dp[j] = max(dp[j-1], dp[j])
function longestCommonSubsequence(text1, text2) {
  if (text1.length === 0 || text2.length === 0) return 0;

  const n = text1.length;
  const m = text2.length;

  //* Stores LCS for the PREVIOUS row (i)
  let dp = new Array(n + 1).fill(0);

  for (let i = 0; i <= n; i++) {
    //* Stores LCS for CURRENT row
    //* We have two different parameters, so this needs to be its own array
    const newDP = new Array(m + 1).fill(0);

    for (let j = 0; j <= m; j++) {
      if (i === 0 || j === 0) {
        newDP[j] = 0; //* Indexing would lead us out of bounds
      } else if (text1[i - 1] === text2[j - 1]) {
        newDP[j] = dp[j - 1] + 1; //* Take whatever we had + 1
      } else {
        newDP[j] = Math.max(newDP[j - 1], dp[j]); //* Take the maximum of both paths
      }
    }

    dp = newDP;
  }

  return dp[m];
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
console.log(longestCommonSubsequence("dokaldklmxzwok", "odkalkskfnkdans")); //* 6

//* Time: O(n * m) - We are caching the results of each subproblem
//* There are n possible indices for text1 and m possible indices for text2
//* Since we have two non-constant parameters, we get n * m possible unique states

//* Space: O(n + m) - We removed the multiplicative factor on the space complexity
//* So now the space complexity is additive (n + m) instead of (n * m)
