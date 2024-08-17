//* Similar to the regular Climbing Stairs problem
//* But we can't dynamically change the number of calls without an additional loop
//! "k" itself does not change our state
//*     - It is merely a constraint on the number of steps we can take
//*     - Use a for loop to handle all 1 .. k step variations at each level of recursion

//! Recurrence Relation: F(n) = F(n-1) + F(n-2) ... + F(n-k)
function climbingStairsKSteps(n, k) {
  function climb(n) {
    if (n < 0) return 0; //* Traveled too far; does not count
    if (n === 0) return 1; //* Traveled to the top step

    let totalWays = 0;

    //* i represents the number of steps
    for (let i = 1; i <= k; i++) {
      //* Pruning to ensure we don't waste calls
      if (n - i >= 0) {
        totalWays += climb(n - i);
      }
    }

    return totalWays;
  }

  return climb(n);
}

console.log(climbingStairsKSteps(2, 2)); //* 2
console.log(climbingStairsKSteps(3, 3)); //* 4
console.log(climbingStairsKSteps(2, 5)); //* 2

//* Time: O(k^n) - The branching factor is "k"; in the worst case (no pruning) there are "k" calls
//* The depth of the recursion tree is "n" since we can reduce "n" by 1 at each step
//* The OVERALL runtime will not be anywhere near as bad as O(k^n) due to the pruning

//* Space: O(n) - The recursion depth scales with "n" at most since we can reduce "n" by as little as 1
