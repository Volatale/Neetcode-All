//! We don't have to worry about overflows
//! Ideally, we take the LARGEST cards from either side
//* However, a greedy approach doesn't necessarily work
//* Take the example: [1, 100, 2, 5], k = 2
//* If we always take the max of left and right, we don't always get the optimal result
//*     - Taking 5 means we then also have to take 2 (if we always take the maximum of both options)
//* But the optimal result involves taking 2 cards from the left (1 + 100) > (5 + 2)
//* Likewise, it also makes no sense to always take the minimum of the two options
//* We can apply a Dynamic Programming approach since we have:
//*     - Overlapping Subproblems
//*     - Optimal Substructure (take the max at each level to get the overall max)
function maxScore(cardPoints, k) {
  function dp(left, right, k) {
    //* Base Case: We are out of bounds, or we can't choose any more cards
    if (left === cardPoints.length || right < 0 || k === 0) return 0;

    //* Utilize the memoized value
    const key = `${left}-${right}-${k}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let score = 0;

    //* Take the left card
    score = Math.max(score, dp(left + 1, right, k - 1) + cardPoints[left]);

    //* Take the right card
    score = Math.max(score, dp(left, right - 1, k - 1) + cardPoints[right]);

    return (memo[key] = score);
  }

  const memo = {};

  //* Return the max points we can get
  return dp(0, cardPoints.length - 1, k);
}

console.log(maxScore([1, 2, 3, 4, 5, 6, 1], 3)); //* 12
console.log(maxScore([1, 2, 3, 4], 3)); //* 9
console.log(maxScore([1, 100, 2, 5], 2)); //* 101
console.log(maxScore([50], 1)); //* 50

//* Time: O(n^2 * k) - There are (n + 1) possible values for both left and right respectively
//* And "k" has k + 1 possible values, so O(n) * O(n) * O(k) = O(n^2 * k)

//* Space: O(n^2 * k) - There are n^2 * k possible subproblems to cache in the absolute worst case
