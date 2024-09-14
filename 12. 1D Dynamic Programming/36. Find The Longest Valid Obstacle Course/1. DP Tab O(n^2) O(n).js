//* At each index, we can either include or exclude the current element
//* This problem is essentially just the Longest Increasing Subsequence problem
//*     - Except it is a Longest Non-decreasing Subsequence performed "n" times

//! TLE
//* Apply tabulation to avoid recursion overhead
//*     - We only have to cache the current index
//!     - Regardless of the prior choices, the later subproblems will end up being the same
//*         - So we only have to rely on caching the current index
function longestObstacleCourseAtEachPosition(obstacles) {
  if (obstacles.length === 0) return [];

  const n = obstacles.length;

  //* dp[i] = Maximum length obstacle course ending at index i
  const dp = new Array(n).fill(1);

  //* "i" represents the current element (index we are ending at)
  //* "j" represents the previous elements
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (obstacles[j] <= obstacles[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return dp;
}

console.log(longestObstacleCourseAtEachPosition([1, 2])); //* [1, 2]
console.log(longestObstacleCourseAtEachPosition([1, 2, 3, 2])); //* [1, 2, 3, 3]
console.log(longestObstacleCourseAtEachPosition([2, 2, 1])); //* [1, 2, 1]
console.log(longestObstacleCourseAtEachPosition([3, 1, 5, 6, 4, 2])); //* [1, 1, 2, 3, 2, 2]

//* Time: O(n^2) - There are "n" possible indices to consider
//* Which also means there "n" possible PREVIOUS indices
//* We are memoizing the results of each subproblem to avoid redundant work

//* Space: O(n) - The DP array scales with the length of the input array
