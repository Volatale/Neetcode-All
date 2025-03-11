//! We don't have to worry about overflows
//! Ideally, we take the LARGEST cards from either side
//* However, a greedy approach doesn't necessarily work
//* Take the example: [1, 100, 2, 5], k = 2
//* If we always take the max of left and right, we don't always get the optimal result
//*     - Taking 5 means we then also have to take 2 (if we always take the maximum of both options)
//* But the optimal result involves taking 2 cards from the left (1 + 100) > (5 + 2)
//* Likewise, it also makes no sense to always take the minimum of the two options
//! We can apply a sliding window approach
//*     - We need to choose "k" cards from the array
//* Get the sum of the entire array
//* Then immediately check if cardPoints.length === k
//*     - Why? Because in that case, we can take every card, so return the total sum from earlier
//! We know there are "n" elements, and we have to choose "k" of them
//*     - Thus, there are (n - k) elements INSIDE the window
//*     - And there are "k" elements OUTSIDE of the window
//* Maintain a sliding window of size (n - k) and track the cumulative sum of those elements
//* When there are "k" elements OUTSIDE of the window, we know we have a valid window
//* Get the sum of the chosen cards (elements OUTSIDE of the window)
//*     - Sum of chosen cards = totalSum (sum of ALL cards) - sum (of elements WITHIN the window)
//* We only need to choose "k" cards, so simply maintain a fixed length sliding window and take the maximum score
function maxScore(cardPoints, k) {
  //* Marks the start and end of the sliding window
  let start = 0;
  let end = 0;

  let totalSum = cardPoints.reduce((acc, curr) => acc + curr, 0);
  let maxScore = 0;
  let sum = 0; //* Tracks sum of elements within the window

  //* We can take the entire array of cards
  if (cardPoints.length === k) return totalSum;

  //* Any element NOT in the window is a chosen card
  while (end < cardPoints.length) {
    //* Add the current card to the window (it is NOT one of the "k" cards)
    sum += cardPoints[end];

    //* We have chosen "k" cards, so there are (n - k) cards NOT chosen
    if (end - start + 1 === cardPoints.length - k) {
      //* Remove the points of the cards that are in the window
      maxScore = Math.max(maxScore, totalSum - sum);
      sum -= cardPoints[start++];
    }

    end++;
  }

  return maxScore;
}

console.log(maxScore([1, 2, 3, 4, 5, 6, 1], 3)); //* 12
console.log(maxScore([1, 2, 3, 4], 3)); //* 9
console.log(maxScore([1, 100, 2, 5], 2)); //* 101
console.log(maxScore([9, 7, 7, 9, 7, 7, 9], 7)); //* 55
console.log(maxScore([50], 1)); //* 50
console.log(maxScore([5, 2, 1, 6, 7, 99, 5, 6, 21, 5], 5)); //* 136
console.log(maxScore([5, 9], 1)); //* 9
