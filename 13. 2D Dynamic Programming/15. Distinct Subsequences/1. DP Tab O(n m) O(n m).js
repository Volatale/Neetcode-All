//* Our goal is to use characters in "s" to reach the end of "t"
//* At each step, we can either include or exclude the current character
//* When we match every character in "t"
//*     - If we also reached the end of "s", then we found a valid subsequence

//* Utilize caching to avoid redundant work
//*     - We have 2D state (i, j) which both track progress through s and t respectively
function numDistinct(s, t) {
  //* There aren't enough characters to find a valid subsequence
  if (s.length < t.length) return 0;

  const n = s.length;
  const m = t.length;

  //* dp[i][j] = Number of valid subsequences ending at index i and j in s, t respectively
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));

  //* Base Case: It is always possible to make an empty string
  dp[0][0] = 1;

  for (let i = 1; i <= n; i++) {
    //* It is always possible to make an empty string ""
    dp[i][0] = 1;

    for (let j = 1; j <= m; j++) {
      //* Case 1: Excude current character
      dp[i][j] = dp[i - 1][j];

      //* Case 2: Include current character
      if (j - 1 >= 0 && s[i - 1] === t[j - 1]) {
        dp[i][j] += dp[i - 1][j - 1];
      }
    }
  }

  //* Number of subsequences ending at the final indices
  return dp[n][m];
}

console.log(numDistinct("aa", "a")); //* 2
console.log(numDistinct("rabbbit", "rabbit")); //* 3
console.log(numDistinct("babgbag", "bag")); //* 5
console.log(numDistinct("xyz", "abc")); //* 0
console.log(numDistinct("battle", "batle")); //* 2
console.log(numDistinct("fifjawhiadaskldskkslkdl", "fwhiadsldkl")); //* 10
console.log(
  numDistinct(
    "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm",
    "qrt"
  )
); //* 56

//* Time: O(n * m) - We are caching the results of each subproblem
//* There are "n" possible indices for "s" and "m" possible indices for "t"
//* Using the rule of product we get n * m unique subproblems

//* Space: O(n * m) - There are n * m unique subproblems, thus n * m unique keys
