//* f(n) = Minimum cost to reach n-th step
//* f(n-1) = Minimum cost to reach (n-1)-th step
//* f(n-2) = Minimum cost to reach (n-2)-th step
//* cost[n] = Cost to use nth step

//! Recurrence Relation: f(n) = min(f(n-1), f(n-2)) + cost[n]
//* Apply Bottom-Up DP (Tabulation)
function minCostClimbingStairs(cost) {
  //* d[i] = Min Cost to get to the i-th step
  const dp = new Array(cost.length + 1).fill(0);
  const n = cost.length;

  //* Seed Values; we START from either the first or second step
  dp[0] = 0;
  dp[1] = 0;

  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }

  return dp[n];
}

console.log(minCostClimbingStairs([10, 15, 20])); //* 15
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); //* 6

//* Time: O(n) - We only have one non-constant parameter: "i", thus our DP is 1-D
//* Instead of recomputing results, we use the cache

//* Space: O(n) - Our "dp" array scales with "n"
