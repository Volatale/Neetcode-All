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
//* Apply memoization to avoid redundant work
//*     - We have two parameters, hence we have 2D state
//*     - Cache both the row and column
function uniquePaths(m, n) {
  function countWays(row, col, memo) {
    if (row < 0 || col < 0) return 0; //* Base Case: Out of bounds
    if (row === 0 && col === 0) return 1; //* Counts as a valid way

    //* Utilize meomized value
    const key = `${row}-${col}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    //* Sum the total ways along both paths (Rule of Sum)
    return (memo[key] =
      countWays(row - 1, col, memo) + countWays(row, col - 1, memo));
  }

  //* (m-1, n-1) makes it easier to conceptualize the grid
  return countWays(m - 1, n - 1, {});
}

console.log(uniquePaths(1, 1)); //* 1
console.log(uniquePaths(3, 2)); //* 3
console.log(uniquePaths(3, 7)); //* 28
console.log(uniquePaths(4, 4)); //* 20

//* Time: O(n * m) - We are memoizing the results of each subproblem
//* There are "m" possible values for rows, and "n" possible values for columns
//* m * n = O(m * n)

//* Space: O(n * m) - The depth of the recursion tree scales with "m" + "n"
//* Even if m is 10, if we are at row 0, we'd still need to keep decreasing the columns
//* There are m * n unique subproblems, thus in the worst case, there are also m * n unique keys/values
