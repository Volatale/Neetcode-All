//* In this version, we care about strings that END in each vowel
//*     - "e", "i", "u" all allow for an "a" to be placed AFTER themselves
//*     - So we accumulate values from THOSE positions

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (n, prevChar)
//* We only need to keep the previous row and the current row in memory simultaneously
//*     - Use bitwise alternation to reduce the space complexity to constant
function countVowelPermutations(n) {
  if (n === 1) return 5;

  const MOD = 10 ** 9 + 7;

  //* dp[n][prevVal] = Number of valid strings of length "n" at prevVal
  const dp = [[], [1, 1, 1, 1, 1]];

  const a = 0;
  const e = 1;
  const i = 2;
  const o = 3;
  const u = 4;

  //* 1 way to make a string of length 1 using any vowel
  dp[1] = [1, 1, 1, 1, 1];

  //* Start from length 2, 0 is irrelevant and 1 was handled by the base case
  //* Accumulate from characters that allow vowel AFTER itself (e, i, u all allow an "a" after)
  for (let L = 2; L <= n; L++) {
    //* Reset values, we are ACCUMULATING, so we'd be using invalid values
    dp[L & 1].fill(0);

    dp[L & 1][a] =
      (dp[(L - 1) & 1][e] + dp[(L - 1) & 1][i] + dp[(L - 1) & 1][u]) % MOD;
    dp[L & 1][e] = (dp[(L - 1) & 1][a] + dp[(L - 1) & 1][i]) % MOD;
    dp[L & 1][i] = (dp[(L - 1) & 1][e] + dp[(L - 1) & 1][o]) % MOD;
    dp[L & 1][o] = dp[(L - 1) & 1][i] % MOD;
    dp[L & 1][u] = (dp[(L - 1) & 1][i] + dp[(L - 1) & 1][o]) % MOD;
  }

  //* Sum the number of ways to create strings of length n
  return dp[n & 1].reduce((acc, curr) => (acc + curr) % MOD, 0);
}

console.log(countVowelPermutations(1)); //* 5
console.log(countVowelPermutations(2)); //* 10
console.log(countVowelPermutations(5)); //* 68
console.log(countVowelPermutations(10)); //* 1739
console.log(countVowelPermutations(144)); //* 18208803

//* Time: O(n) - We are caching the results for each subproblem
//* In this version, we condensed the code down to only need a single for loop (+ the reduce())

//* Space: O(1) - We are only keeping two rows in memory at the same time, and we alternate between them
