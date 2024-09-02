//* Basically the same logic as Fibonacci
//!     - Except we have THREE numbers now
//* Look at the LAST THREE numbers instead of the last two

//! Recurrence Relation: F(n) = F(n - 1) + F(n - 2) + F(n-3)
//* Apply tabulation to avoid recursion overhead
function tribonacci(n) {
  //* dp[i] = Nth Tribonacci Number
  const dp = new Array(n + 1).fill(0);

  dp[0] = 0; //* 0th Trib = 0
  dp[1] = 1; //* 1st Trib = 1
  dp[2] = 1; //* 2nd Trib = 2
  dp[3] = 2; //* 3rd Trib = 3

  //* Calculate every other Tribonacci number
  for (let i = 4; i <= n; i++) {
    dp[i] += dp[i - 1];
    dp[i] += dp[i - 2];
    dp[i] += dp[i - 3];
  }

  return dp[n];
}

console.log(tribonacci(3)); //* 4
console.log(tribonacci(4)); //* 4
console.log(tribonacci(5)); //* 7
console.log(tribonacci(25)); //* 1389537
console.log(tribonacci(30)); //* 29249425
console.log(tribonacci(35)); //* 615693474

//* Time: O(n) - We have one non-constant parameter; "n" itself
//* We subtract 1, 2 and 3 from "n" at each step
//* So we only have ONE dimension to worry about

//* Space: O(n) - The DP array scales with "n" itself
