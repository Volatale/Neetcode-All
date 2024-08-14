//* f(n) = Minimum cost to reach n-th step
//* f(n-1) = Minimum cost to reach (n-1)-th step
//* f(n-2) = Minimum cost to reach (n-2)-th step
//* cost[n] = Cost to use nth step

//! Recurrence Relation: f(n) = min(f(n-1), f(n-2)) + cost[n]
//* According to the recurrence relation, we only need the two previous values
//* So instead of using an entire array of length n
//*     - We can keep track of the previous two values using explicit variables
function minCostClimbingStairs(cost) {
  if (cost.length === 2) return Math.min(cost[0], cost[1]);
  const n = cost.length;

  //* These variables track f(n-1) and f(n-2)
  let first = cost[0];
  let second = cost[1];

  for (let i = 2; i < n; i++) {
    //* Current tracks f(n): f(n) = min(f(n-1), f(n-2)) + cost[n]
    const current = cost[i] + Math.min(first, second);
    first = second;
    second = current;
  }

  return Math.min(first, second);
}

console.log(minCostClimbingStairs([10, 15, 20])); //* 15
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); //* 6

//* Time: O(n) - The for loop scales with the input's length

//* Space: O(1) - We only keep track of the previous two values
//* So we use constant space
