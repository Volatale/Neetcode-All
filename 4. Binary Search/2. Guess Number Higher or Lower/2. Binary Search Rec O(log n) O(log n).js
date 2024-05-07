//* Search Space ranges from 1 to n
//* 1 to "n" is sorted in Ascending Order
//* We know we call function that returns a number that tells us the direction to go in
//* Based on this information, we can use Binary Search to solve this efficiently
function guessNumber(n, left = 1, right = n) {
  if (left > right) return left;

  let mid = left + ((right - left) >> 1); //* Avoid overflow, divide by 2, trunctate decimals
  const result = guess(mid); //* Only call the function once

  if (result === 0) {
    return mid;
  } else if (result === -1) {
    return guessNumber(n, left, mid - 1); //* Eliminate right portion
  } else {
    return guessNumber(n, mid + 1, right); //* Eliminate left portion
  }
}

//* Time: O(log n) - We eliminate half of the search space every iteration of the loop

//* Space: O(log n) - There will be log n recursive calls
//* So the call stack will scale logarithmically in size
