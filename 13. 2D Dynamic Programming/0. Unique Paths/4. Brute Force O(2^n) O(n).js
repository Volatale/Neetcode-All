//* We are given the size of the grid, but not the grid itself
//* Since we are doing top-down DP
//*     - Start at the bottom-right cell
//*     - End at top-left

//! Recurrence Relation: F(i,j) = F(i-1,j) + F(i,j-1)
function uniquePaths(m, n) {
  function findPath(m, n) {
    if (m < 0 || n < 0) return 0; //* Out of Bounds
    if (m === 0 && n === 0) return 1; //* Found a path

    //* Number of Distinct paths to get to (m, n)
    return findPath(m - 1, n) + findPath(m, n - 1);
  }

  return findPath(m - 1, n - 1);
}

console.log(uniquePaths(3, 7)); //* 28
console.log(uniquePaths(3, 2)); //* 3
console.log(uniquePaths(2, 2)); //* 2
console.log(uniquePaths(4, 4)); //* 20
console.log(uniquePaths(3, 3)); //* 6

//* Time: O(2^n) - There are two non-constant parameters, so we have 2D state
//* At each step, we generate two additional calls

//* Space: O(n + m) - The depth of the recursion tree scales at a rate of n + m
//* If we decrease "m" to 0, then we still have to decrease "n" to 0
