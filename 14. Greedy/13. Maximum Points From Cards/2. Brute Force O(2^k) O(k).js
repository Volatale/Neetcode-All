//* At each step, choose either the left or right card
//* We need to track our progress at each step
//* So in a brute force manner, use two pointers
//*     - Left tracks the next "left" card we can take
//*     - Right tracks the next "right" card we can take
//* Take the MAXIMUM of both choices at each step
function maxScore(cardPoints, k) {
  function chooseCard(left, right, k) {
    //* We can't choose anymore cards
    if (k === 0) return 0;

    return Math.max(
      chooseCard(left + 1, right, k - 1) + cardPoints[left], //* Left Card
      chooseCard(left, right - 1, k - 1) + cardPoints[right] //* Right Card
    );
  }

  return chooseCard(0, cardPoints.length - 1, k);
}

console.log(maxScore([1, 2, 3, 4, 5, 6, 1], 3)); //* 12
console.log(maxScore([4, 5, 6], 1)); //* 6
console.log(maxScore([4, 5, 6], 3)); //* 15
console.log(maxScore([9, 7, 7, 9, 7, 7, 9], 7)); //* 55

//* Time: O(2^k) - At each step, we can make two decisions
//* Take the leftmost card, or the rightmost card
//* We can only choose "k" cards, so the height of the recursion tree is "k"

//* Space: O(k) - The height of the recursion tree is "k"
