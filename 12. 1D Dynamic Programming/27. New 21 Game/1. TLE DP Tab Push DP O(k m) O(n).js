//* Each card has an EQUAL probability of being drawn
//!     - Uniform distribution
//* Every card draw is INDEPENDENT of each other
//!     - Previous draws DO NOT affect the future draws
//!     - Distinct events
//* Based on these conditions, we need to try EVERY possible drawing of cards
//* Probability formula = Success / Total Chances

//* Apply tabulation to avoid redundant work
//* p = Points
//! Recurrence Relation: F(p) = average(P(p + i)) for all p <= n
function new21Game(n, k, maxPts) {
  //* If k is 0, we win automatically
  //* If n >= k + maxPts, it is impossible to lose
  if (k === 0 || n >= k + maxPts) return 1;

  //* dp[i] = Probability of all scores up to "n"
  const dp = new Array(n + 1).fill(0);

  let result = 0;

  //* Base Case: We have a 100% chance of
  dp[0] = 1;

  for (let points = 0; points < k; points++) {
    //* Skip if no probability
    if (dp[points] === 0) continue;

    for (let card = 1; card <= maxPts; card++) {
      if (points + card <= n) {
        dp[points + card] += dp[points] / maxPts;
      }
    }
  }

  //* Sum the probabilities from "k" to "n"
  for (let points = k; points <= n; points++) {
    result += dp[points];
  }

  return result;
}

console.log(new21Game(10, 1, 10)); //* 1.00000
console.log(new21Game(3, 2, 3)); //* 0.888888
console.log(new21Game(6, 1, 10)); //* 0.600000
console.log(new21Game(21, 17, 10)); //* 0.73278

//* Time: O(m * k) - Where "m" is maxPts
//* For every point (ranging from 0 to k), we do an O(maxPts) loop
//* Then, we do a loop from k to n (inclusive) to sum the probabilities

//* Space: O(n) - The DP array scales with "n" itself
