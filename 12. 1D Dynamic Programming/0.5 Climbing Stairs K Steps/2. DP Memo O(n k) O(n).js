//* Similar to the regular Climbing Stairs problem
//* But we can't dynamically change the number of calls without an additional loop
//! "k" itself does not change our state
//*     - It is merely a constraint on the number of steps we can take
//*     - Use a for loop to handle all 1 .. k step variations at each level of recursion

//! Recurrence Relation: F(n) = F(n-1) + F(n-2) ... + F(n-k)
//* Use Memoization to optimize the time complexity
function climbingStairsKSteps(n, k) {
  function climb(n, memo) {
    //* Utilize memoized results
    if (memo.hasOwnProperty(n)) return memo[n];

    if (n < 0) return 0; //* Traveled too far; does not count
    if (n === 0) return 1; //* Traveled to the top step

    let totalWays = 0;

    //* i represents the number of steps
    for (let i = 1; i <= k; i++) {
      //* Pruning to ensure we don't waste calls
      if (n - i >= 0) {
        totalWays += climb(n - i, memo);
      }
    }

    return totalWays;
  }

  return climb(n, {});
}

console.log(climbingStairsKSteps(2, 2)); //* 2
console.log(climbingStairsKSteps(3, 3)); //* 4
console.log(climbingStairsKSteps(2, 5)); //* 2

//* Time: O(n * k) - There are only "n" subproblems to compute due to the memoization
//* Within each call, we perform an O(k) for loop to compute the other subproblems

//* Space: O(n) - The depth of the recursion tree is "n" since we can reduce "n" by at minimum 1 each step
//* The memo object will store "n" keys at most
