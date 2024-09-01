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

//* Apply tabulation to avoid recursion overhead
function integerBreak(n) {
  //* dp[i] = Maximum product we can get by breaking "i"
  const dp = new Array(n + 1).fill(0);

  //* 1 itself cannot be broken further
  dp[1] = 1;

  //* "num" is the number we are trying to break (each "n")
  //* "i" represents the amount we are subtracting FROM n to "break" the number
  for (let num = 2; num <= n; num++) {
    for (let i = 1; i < num; i++) {
      dp[num] = Math.max(dp[num], i * (num - i), i * dp[num - i]);
    }
  }

  return dp[n];
}

console.log(integerBreak(2)); //* 1
console.log(integerBreak(4)); //* 2
console.log(integerBreak(10)); //* 36

//* Time: O(n^2) - There are n^2 unique subproblems

//* Space: O(n) - We optimized space by only requiring a single row
