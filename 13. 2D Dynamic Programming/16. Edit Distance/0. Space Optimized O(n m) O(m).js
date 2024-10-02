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
//*     - It is possible to optimize for space by only using a single array length
function minDistance(word1, word2) {
  const n = word1.length;
  const m = word2.length;

  //* dp[i][j] = Minimum number of operations to turn word1 into word2 at i, j
  const dp = new Array(m + 1).fill(0);

  //* Turning an empty string into word2 needs "i" insertions
  for (let j = 1; j <= m; j++) {
    dp[j] = j;
  }

  //* Try matching every character
  for (let i = 1; i <= n; i++) {
    let topLeft = dp[0]; //* Represents [i-1][j-1] (pre-modification)
    dp[0] = i;

    for (let j = 1; j <= m; j++) {
      let temp = dp[j]; //* Holds value before modification

      if (word1[i - 1] === word2[j - 1]) {
        //* Characters match; no operation needed
        dp[j] = topLeft;
      } else {
        //* Characters don't match; try one of the operations
        dp[j] = Math.min(dp[j], dp[j - 1], topLeft) + 1;
      }

      topLeft = temp;
    }
  }

  return dp[m];
}

console.log(minDistance("", "abc")); //* 3
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

//* Space: O(m) - The DP array only scales with the length of word2
