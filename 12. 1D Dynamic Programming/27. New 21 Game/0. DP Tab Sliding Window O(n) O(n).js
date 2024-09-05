//* Each card has an EQUAL probability of being drawn
//!     - Uniform distribution
//* Every card draw is INDEPENDENT of each other
//!     - Previous draws DO NOT affect the future draws
//!     - Distinct events
//* Based on these conditions, we need to try EVERY possible drawing of cards
//* Probability formula = Success / Total Chances

//* Optimize using (fixed length) sliding window logic
//!     - maxPts is basically our window size
//* Window Sum tracks the sum of the probabilities in the window
//*     - At each index we divide the sum by maxPts

//* Apply tabulation to avoid redundant work
//* p = Points
//! Recurrence Relation: F(p) = average(P(p + i)) for all p <= n
function new21Game(n, k, maxPts) {
  //* If k is 0, we win automatically
  //* If n >= k + maxPts, it is impossible to lose
  if (k === 0 || n >= k + maxPts) return 1;

  //* dp[i] = Probability of all scores up to "n"
  const dp = new Array(n + 1).fill(0);

  //* Base Case: 100% chance to get 0 points (we start there)
  dp[0] = 1;

  let result = 0.0;
  let windowSum = 1.0;

  for (let points = 1; points <= n; points++) {
    dp[points] = windowSum / maxPts;

    //* Extend window
    if (points < k) {
      windowSum += dp[points];
    } else {
      result += dp[points];
    }

    //* Decrease window
    if (points >= maxPts) {
      windowSum -= dp[points - maxPts];
    }
  }

  return result;
}

console.log(new21Game(10, 1, 10)); //* 1.00000
console.log(new21Game(3, 2, 3)); //* 0.888888
console.log(new21Game(6, 1, 10)); //* 0.600000
console.log(new21Game(21, 17, 10)); //* 0.73278

//* Time: O(n) - It takes O(n) to create the DP array
//* Then we iterate over the entire array once up to "n"

//* Space: O(n) - The DP array scales with "n" itself
