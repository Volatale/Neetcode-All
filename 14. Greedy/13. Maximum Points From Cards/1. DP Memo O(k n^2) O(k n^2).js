//* At each step, choose either the left or right card
//* We need to track our progress at each step
//* So in a brute force manner, use two pointers
//*     - Left tracks the next "left" card we can take
//*     - Right tracks the next "right" card we can take
//* Take the MAXIMUM of both choices at each step

//* Apply memoization to avoid redundant work
//*     - We have 3D state (left, right, k)
function maxScore(cardPoints, k) {
  function chooseCard(left, right, k) {
    //* We can't choose anymore cards
    if (k === 0) return 0;

    //* Utilize memoized value
    if (dp[k][left][right] !== -1) return dp[k][left][right];

    return (dp[k][left][right] = Math.max(
      chooseCard(left + 1, right, k - 1) + cardPoints[left], //* Left Card
      chooseCard(left, right - 1, k - 1) + cardPoints[right] //* Right Card
    ));
  }

  const n = cardPoints.length;

  const dp = new Array(k + 1)
    .fill(0)
    .map(() => new Array(n).fill(-1).map(() => new Array(n).fill(-1)));

  return chooseCard(0, cardPoints.length - 1, k);
}

console.log(maxScore([1, 2, 3, 4, 5, 6, 1], 3)); //* 12
console.log(maxScore([4, 5, 6], 1)); //* 6
console.log(maxScore([4, 5, 6], 3)); //* 15
console.log(maxScore([9, 7, 7, 9, 7, 7, 9], 7)); //* 55

//* Time: O(k * n^2) - We are memoizing the results of each subproblem
//* There are "n" possible values for left and right respectively
//* And "k" possible values for "k", so "k * n * n" unique states

//* Space: O(k * n^2) - There are "k * n * n" unique states, so the DP array is scaled the same way
//* The height of the recursion tree is "k"
