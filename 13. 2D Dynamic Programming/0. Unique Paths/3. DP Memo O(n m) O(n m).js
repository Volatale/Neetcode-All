//* We are given the size of the grid, but not the grid itself
//* Since we are doing top-down DP
//*     - Start at the bottom-right cell
//*     - End at top-left

//! Recurrence Relation: F(i,j) = F(i-1,j) + F(i,j-1)
//* Apply memoization
function uniquePaths(m, n) {
  function findPath(m, n, memo) {
    if (m < 0 || n < 0) return 0; //* Out of Bounds
    if (m === 0 && n === 0) return 1; //* Found a path

    //* Utilize memoized values
    const key = `${m}-${n}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    //* Number of Distinct paths to get to (m, n)
    memo[key] = findPath(m - 1, n, memo) + findPath(m, n - 1, memo);
    return memo[key];
  }

  const memo = {};
  return findPath(m - 1, n - 1, memo);
}

console.log(uniquePaths(3, 7)); //* 28
console.log(uniquePaths(3, 2)); //* 3
console.log(uniquePaths(2, 2)); //* 2
console.log(uniquePaths(4, 4)); //* 20
console.log(uniquePaths(3, 3)); //* 6

//* Time: O(m * n) - We memoize computations, so there are only n * m distinct subproblems

//* Space: O(n * m) - We cache each of the n * m subproblems, so there are n * m unique keys
//* The depth of the recursion tree still scales at a rate of n + m
//* If we decrease "m" to 0, then we still have to decrease "n" to 0
