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
  const dp = new Array(m + 1).fill(0);

  dp[0] = 1;

  //* Iterate "j" in REVERSE to avoid overwriting [j-1] in the same iteration
  for (let i = 1; i <= n; i++) {
    for (let j = m; j >= 1; j--) {
      //* Case 1: Include current character
      if (s[i - 1] === t[j - 1]) {
        dp[j] += dp[j - 1];
      }
    }
  }

  //* Number of subsequences ending at the final indices
  return dp[m];
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

//* Space: O(m) - We are using a singular array that scales with the length of "t"
