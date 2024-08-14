//* f(n) = Minimum cost to reach n-th step
//* f(n-1) = Minimum cost to reach (n-1)-th step
//* f(n-2) = Minimum cost to reach (n-2)-th step
//* cost[n] = Cost to use nth step

//! Recurrence Relation: f(n) = min(f(n-1), f(n-2)) + cost[n]
function minCostClimbingStairs(cost) {
  function climb(i) {
    //* Base Cases, we start from these stairs, thus they are base cases
    if (i === 0) return cost[0];
    if (i === 1) return cost[1];

    //* f(n) = min(f(n-1), f(n-2)) + cost[n]
    return Math.min(climb(i - 1), climb(i - 2)) + cost[i];
  }

  const n = cost.length;
  return Math.min(climb(n - 1), climb(n - 2));
}

console.log(minCostClimbingStairs([10, 15, 20])); //* 15
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); //* 6

//* Time: O(2^n) - At each step, we potentially create two extra calls
//* The depth of the recursion tree scales with "n"
//* At each step we can potentially reduce the state by 1
//* So the branching factor is "2" and the height of the tree is "n"

//* Space: O(n) - The depth of the recursion tree scales with "n"
//* At each step we can reduce the state by 1
