//* At each index, we can either include or exclude the current element
//* This problem is essentially just the Longest Increasing Subsequence problem
//*     - Except it is a Longest Non-decreasing Subsequence performed "n" times

//! TLE
//* Apply memoization to avoid redundant work
//*     - We only have to cache the current index
//!     - Regardless of the prior choices, the later subproblems will end up being the same
//*         - So we only have to rely on caching the current index
function longestObstacleCourseAtEachPosition(obstacles) {
  function getLongestCourse(i, memo) {
    //* The obstacle course always includes itself (always 1)
    let maxLength = 1;

    //* Utilize memoized value
    if (memo.hasOwnProperty(i)) return memo[i];

    //* Consider every element at indices up to i
    for (let j = 0; j < i; j++) {
      if (obstacles[j] <= obstacles[i]) {
        maxLength = Math.max(maxLength, getLongestCourse(j, memo) + 1);
      }
    }

    memo[i] = maxLength;
    return maxLength;
  }

  //* Every obstacle course includes at least itself
  const results = new Array(obstacles.length).fill(1);
  const memo = {};

  //* For each index, calculate the longest course ending at index i
  for (let i = 0; i < obstacles.length; i++) {
    results[i] = getLongestCourse(i, memo);
  }

  return results;
}

console.log(longestObstacleCourseAtEachPosition([1, 2])); //* [1, 2]
console.log(longestObstacleCourseAtEachPosition([1, 2, 3, 2])); //* [1, 2, 3, 3]
console.log(longestObstacleCourseAtEachPosition([2, 2, 1])); //* [1, 2, 1]
console.log(longestObstacleCourseAtEachPosition([3, 1, 5, 6, 4, 2])); //* [1, 1, 2, 3, 2, 2]

//* Time: O(n^2) - There are "n" possible indices to consider
//* Which also means there "n" possible PREVIOUS indices
//* We are memoizing the results of each subproblem to avoid redundant work

//* Space: O(n) - The results array scales with "n", and so does the recursion depth
//* The memo object stores "n" keys/values in the worst case
