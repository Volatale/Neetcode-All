//* Similar to the regular Climbing Stairs problem
//* But we can't dynamically change the number of calls without an additional loop
//! "k" itself does not change our state
//*     - It is merely a constraint on the number of steps we can take
//*     - Use a for loop to handle all 1 .. k step variations at each level of recursion

//! Recurrence Relation: F(n) = F(n-1) + F(n-2) ... + F(n-k)
//* Use Tabulation to remove the need for recursion
function climbingStairsKSteps(n, k) {
  //* dp[i] = No. of Distinct Ways to reach ith step
  const dp = new Array(n + 1).fill(0);

  //* Seed Values: These are our base cases
  //* There is only 1 distinct way to reach step 0 and step 1
  dp[0] = 1;
  dp[1] = 1;

  //* i represents ith step, j represents j-th previous step
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      //* Ensure we stay within bounds
      if (i - j >= 0) {
        dp[i] += dp[i - j];
      }
    }
  }

  return dp[n];
}

console.log(climbingStairsKSteps(2, 2)); //* 2
console.log(climbingStairsKSteps(3, 3)); //* 4
console.log(climbingStairsKSteps(2, 5)); //* 2

//* Time: O(n * k) - It takes O(n) to create the dp array in general
//* Then, we perform an O(n) for loop followed by a nested for loop that scales with "k"
//* So for every outer iteration, there are "k" inner iterations

//* Space: O(n) - We create an array of size "n", so the space usage scales with "n"
