//* The problem involves subsets
//*     - Naturally, finding the OPTIMAL subset requires computing EVERY possible subset
//*     - At each step, we either INCLUDE the current element or we EXCLUDE it
//* There is no heuristic we can use to determine the (locally) optimal decision
//*     - And we need the globally optimal result, so we need to apply a brute force approach
//! Precompute the frequency of each element's numbers
//*     - Otherwise, we need to do a loop of "m" length within each call
//*         - Where "m" is the length of the longest string in strs ()
//*         - This would increase the time complexity to O(2^n * m) from O(2^n)

//* Apply caching to avoid redundant work
//*     - We have 3D state (i, zeroes, ones)
//*     - The index needs to be cached too because (0, 2, 3) is not the same as (2, 2, 3)
//! In our case, we optimize from a 3D array to a 2D array
//*     - Iterate BACKWARDS to ensure we don't overwrite states we still depend on
function findMaxForm(strs, m, n) {
  if (strs.length === 0) return 0;

  //* dp[m][n] = Largest subset of strs that has <= m 0s and <= n 1s
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  //* Precompute the frequency of every string
  const freq = getFreq(strs);

  //* Iterate over all of the strings
  for (let i = 0; i < strs.length; i++) {
    const str = freq[strs[i]];
    const zeroesInStr = str[0];
    const onesInStr = str[1];

    //* Iterate backwards to avoid overwriting states we still depend on
    for (let zeroes = m; zeroes >= zeroesInStr; zeroes--) {
      for (let ones = n; ones >= onesInStr; ones--) {
        dp[zeroes][ones] = Math.max(
          dp[zeroes][ones],
          dp[zeroes - zeroesInStr][ones - onesInStr] + 1
        );
      }
    }
  }

  return dp[m][n];
}

function getFreq(strs) {
  const freq = {};

  for (const str of strs) {
    const count = [0, 0];

    for (let i = 0; i < str.length; i++) {
      if (str[i] === "0") {
        count[0]++;
      } else {
        count[1]++;
      }
    }

    freq[str] = count;
  }

  return freq;
}

console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)); //* 4
console.log(findMaxForm(["10", "0", "1"], 1, 1)); //* 2
console.log(findMaxForm(["1", "0", "1"], 1, 2)); //* 3
console.log(findMaxForm(["1000"], 30, 30)); //* 1
console.log(findMaxForm(["1", "1", "1"], 1, 3)); //* 3
console.log(findMaxForm(["101", "1", "0", "10", "1", "10101"], 2, 3)); //* 4

//* Time: O(L * n * m) - We are caching the results of each subproblem
//* There are "L" possible values for i (strs.length)
//* There are "m" possible values for the number of 0s and "n" possible values for the number of 1s
//* Using the rule of product, we get L * n * m unique subproblems
//* It also takes O(L * m) to get count the frequency of every string

//* Space: O(n * m) - The DP array scales with "m" and "n" themselves
//* The frequency map has "n" keys / values, and each value is an array of length 2
