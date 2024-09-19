//* Counting the number of ways to do something is combinatorics
//*     - Combinatorics = Math, Brute Force, Dynamic Programming etc
//* Rule of Sum applies
//*     - We can EITHER move down OR right (mutual exclusion)
//* (m - 1, n - 1) makes it easier to conceptualize the grid
//*     - Indexing into index "n" or "m" makes no sense as that would be out of bounds
//* This is top down, so technically we are going UP and LEFT
//*     - So we travel to the TOP-LEFT instead of BOTTOM-RIGHT
//* Sum the total number of ways from BOTH paths

//! Recurrence Relation: F(m, n) = F(m - 1, n) + F(m, n - 1)
function uniquePaths(m, n) {
  function countWays(row, col) {
    if (row < 0 || col < 0) return 0; //* Base Case: Out of bounds
    if (row === 0 && col === 0) return 1; //* Counts as a valid way

    //* Sum the total ways along both paths (Rule of Sum)
    return countWays(row - 1, col) + countWays(row, col - 1);
  }

  //* (m-1, n-1) makes it easier to conceptualize the grid
  return countWays(m - 1, n - 1);
}

console.log(uniquePaths(1, 1)); //* 1
console.log(uniquePaths(3, 2)); //* 3
console.log(uniquePaths(3, 7)); //* 28
console.log(uniquePaths(4, 4)); //* 20

//* Time: O(2^(n + m)) - At each step, we make two additional calls
//* The branching factor is 2 and the depth of the recursion tree is m + n

//* Space: O(n + m) - The depth of the recursion tree scales with "m" + "n"
//* Even if m is 10, if we are at row 0, we'd still need to keep decreasing the columns
