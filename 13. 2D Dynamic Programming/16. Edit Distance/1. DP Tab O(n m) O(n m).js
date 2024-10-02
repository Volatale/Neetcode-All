//* Similar to Longest Common Subsequence
//* Exceot we have THREE choices instead of two
//* If the characters match, we don't need to perform any operations
//*     - Just progress both i and j at th esame time
//* When we insert/delete, we insert/delete at the CURRENT index
//*     - So essentially, either i or j will stay the same, respectively
//*     - While the other one progresses
//!     - Conceptually, one of the strings would "change" if we literally inserted/deleted
//*         - So that is why one of the pointers does not mov
//*         - "" vs "abc"
//*             - Inserting an "a" does not move the "i" pointer, only the "j" pointer
//*             - We basically forced a match by inserting an "a"
//* When replacing, progress both i and j
//*     - Neither string needs to be modified, but this counts as an operation

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (i, j)
function minDistance(word1, word2) {
  const n = word1.length;
  const m = word2.length;

  //* dp[i][j] = Minimum number of operations to turn word1 into word2 at i, j
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));

  //* Turning word1 into an empty string needs "i" deletions
  for (let i = 1; i <= n; i++) {
    dp[i][0] = i;
  }

  //* Turning an empty string into word2 needs "i" insertions
  for (let j = 1; j <= m; j++) {
    dp[0][j] = j;
  }

  //* Try matching every character
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        //* Characters match; no operation needed
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        //* Characters don't match; try one of the operations
        dp[i][j] =
          Math.min(
            dp[i][j - 1], //* Insert
            dp[i - 1][j], //* Delete
            dp[i - 1][j - 1] //* Replace
          ) + 1;
      }
    }
  }

  return dp[n][m];
}

console.log(minDistance("abc", "abc")); //* 3
console.log(minDistance("horse", "ros")); //* 3
console.log(minDistance("intention", "execution")); //* 5
console.log(minDistance("xyz", "fgh")); //* 3
console.log(minDistance("qwertyuyupopds", "ds")); //* 12
console.log(minDistance("zxcvbnmqwertyuiop", "ros")); //* 15
console.log(minDistance("abcd", "")); //* 4
console.log(
  minDistance("ydaskjdsfwiodwaldaskl", "fjowakdlsakdlsdowklawdwasgejfdkal")
); //* 23
console.log(minDistance("abc", "abc")); //* 0

//* Time: O(n * m) - We are caching the results of each subproblem
//* There are "n" possible indices for word1 and "m" possible indices for word2
//* That gives us n * m unique subproblems

//* Space: O(n * m) - The DP array scales with the size of both n and m
