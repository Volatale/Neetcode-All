//* We need to choose "k" cards from the borders of the array
//* So we first try summing the last "k" cards
//* Since we need "k" cards, we have a FIXED size sliding window
//*     - Any values WITHIN the window are excluded from the sum
//*     - And any values OUTSIDE of the window are our "selected" cards
//* The element at cardpoints[start] is being ADDED to our sum
//*     - It is LEAVING the window, thus we add it to the currSum
//* The element at cardpoints[end] is being REMOVED from our sum
//*     - It is ENTERING the window, thus we subtract it from currSum
//! currSum tracks the value of everything outside of the window
function maxScore(cardPoints, k) {
  if (cardPoints.length === 0 || k === 0) return 0;

  //* Any value WITHIN this window is excluded from our choices
  let start = 0;
  let end = cardPoints.length - k;

  //* Sum of values outside of window
  let currSum = 0;

  //* Compute the max considering only cards on the right
  for (let i = end; i < cardPoints.length; i++) {
    currSum += cardPoints[i];
  }

  //* This is what we have to beat
  let maxPoints = currSum;

  //* Compute the rest of choices
  while (end < cardPoints.length) {
    //* Compute next window (add card on left, subtract card on right)
    currSum += cardPoints[start++] - cardPoints[end++];
    maxPoints = Math.max(maxPoints, currSum);
  }

  return maxPoints;
}

console.log(maxScore([1, 2, 3, 4, 5, 6, 1], 3)); //* 12
console.log(maxScore([4, 5, 6], 1)); //* 6
console.log(maxScore([4, 5, 6], 3)); //* 15
console.log(maxScore([9, 7, 7, 9, 7, 7, 9], 7)); //* 55

//* Time: O(k) - It takes O(k) to compute the sum considering only the rightmost cards
//* Then we shfit the window to the right "k" times

//* Space: O(1) - We are only using constant space variables
