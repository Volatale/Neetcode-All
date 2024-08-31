//* We need to break the integer up into parts
//!     - The input itself MUST be broken up
//* But the subsequent calls may NOT want to break up
//*     - 1 x 3 = 3
//*     - 1 x 2 = 2
//*         - 2 < 3, so we'd want to keep 3 intact, for example
//* Calculate the product in both ways
//*     - Break the number up
//*     - Don't break the number up
//* Take the maximum of both of these choices

//* Apply memoization to avoid redundant work
function integerBreak(n) {
  function breakInteger(n, memo) {
    //* Base Case: 1 cannot be broken up
    if (n === 1) return 1;

    //* Utilize memoized value
    if (memo.hasOwnProperty(n)) return memo[n];

    let maxProduct = 0;

    //* Try every combination of numbers
    for (let i = 1; i < n; i++) {
      maxProduct = Math.max(
        maxProduct,
        i * (n - i), //* Don't break integer
        i * breakInteger(n - i, memo) //* Break integer
      );
    }

    return maxProduct;
  }

  return breakInteger(n, {});
}

console.log(integerBreak(2)); //* 1
console.log(integerBreak(4)); //* 2
console.log(integerBreak(10)); //* 36

//* Time: O(n^2) - We are memoizing the results of each subproblem
//* There are n^2 unique subproblems in the worst case
//* The branching factor is "n-1", so "n", and the height of the recursion tree is also n

//* Space: O(n^2) - The depth of the recursion tree scales with "n"
//* There are n^2 unique subproblems to cache, thus n^2 possible keys/values
