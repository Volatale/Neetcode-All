//* Each card has an EQUAL probability of being drawn
//!     - Uniform distribution
//* Every card draw is INDEPENDENT of each other
//!     - Previous draws DO NOT affect the future draws
//!     - Distinct events
//* Based on these conditions, we need to try EVERY possible drawing of cards
//* Probability formula = Success / Total Chances

//* p = Points
//! Recurrence Relation: F(p) = average(P(p + i)) for all p <= n
function new21Game(n, k, maxPts) {
  function drawCards(points) {
    //* Base Case: We have enough points
    if (points >= k) return points <= n ? 1 : 0;

    let probability = 0;

    //* Every card has equal probability, so try ALL of them
    for (let card = 1; card <= maxPts; card++) {
      probability += drawCards(points + card);
    }

    //* Probability = Successes / Total Chances
    return probability / maxPts;
  }

  return drawCards(0);
}

console.log(new21Game(10, 1, 10)); //* 1.00000
console.log(new21Game(3, 2, 3)); //* 0.888888
console.log(new21Game(6, 1, 10)); //* 0.600000
console.log(new21Game(21, 17, 10)); //* 0.73278

//* Time: O(m^k) - Where "m" is maxPts
//* The branching factor scales with maxPts (m)
//* We have a a for loop that does maxPts iterations each call
//* The depth of the recursion tree scales with "k"

//* Space: O(k) - The depth of the recursion tree scales with "k" itself
//* In the worst case, we keep adding 1 to points which means we'd be "k" calls deep
