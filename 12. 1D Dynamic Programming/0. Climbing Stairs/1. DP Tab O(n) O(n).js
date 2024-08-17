//* Apply Dynamic Programming (Tabulation)
//* Recurrence relation: F(n) = F(n-1) + F(n-2)
function climbStairs(n) {
  if (n <= 2) return n;

  //* dp[i] = No. of Distinct Ways to reach i-th step using 1 or 2 steps
  const dp = new Array(n + 1).fill(0);

  //* Seed Values: There is 1 way to reach stair "n" from both 0 and 1
  dp[0] = 1;
  dp[1] = 1;

  //* Compute the rest of the results using the recurrence relation
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

console.log(climbStairs(2)); //* 2
console.log(climbStairs(3)); //* 3
console.log(climbStairs(4)); //* 5
console.log(climbStairs(5)); //* 8
console.log(climbStairs(8)); //* 34

//* Time: O(n) - It takes O(n) time to create the DP array
//* Then we do an O(n) time for loop

//* Space: O(n) - The DP array has a length of "n" (+1)
