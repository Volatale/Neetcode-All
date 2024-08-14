//* f(n) = Minimum cost to reach n-th step
//* f(n-1) = Minimum cost to reach (n-1)-th step
//* f(n-2) = Minimum cost to reach (n-2)-th step
//* cost[n] = Cost to use nth step

//! Recurrence Relation: f(n) = min(f(n-1), f(n-2)) + cost[n]
//* Apply Top-Down DP (Memoization)
function minCostClimbingStairs(cost) {
  function climb(i, memo) {
    //* Utilize Cache
    if (memo.hasOwnProperty(i)) return memo[i];

    //* Base Cases, we start from these stairs, thus they are base cases
    if (i === 0) return cost[0];
    if (i === 1) return cost[1];

    //* f(n) = min(f(n-1), f(n-2)) + cost[n]
    memo[i] = Math.min(climb(i - 1, memo), climb(i - 2, memo)) + cost[i];
    return memo[i];
  }

  const n = cost.length;
  const memo = {};
  return Math.min(climb(n - 1, memo), climb(n - 2, memo));
}

console.log(minCostClimbingStairs([10, 15, 20])); //* 15
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); //* 6

//* Time: O(n) - We only have one non-constant parameter: "i", thus our DP is 1-D
//* Instead of recomputing results, we use the cache

//* Space: O(n) - The depth of the recursion tree scales with "n"
//* At each step we can reduce "i" (our state) by 1 or 2
//* In the worst case, we reduce it by 1 each time and therefore the depth of the tree is "n"
//* The memo object stores "n" keys/values in total
