//* Search Space ranges from 1 to n
//* 1 to "n" is sorted in Ascending Order
//* We know we call function that returns a number that tells us the direction to go in
//* Based on this information, we can use Binary Search to solve this efficiently
function guessNumber(n) {
  //* Numbers ranging from 1 to n, so that is the search space
  let left = 1;
  let right = n;

  while (left < right) {
    let mid = left + ((right - left) >> 1); //* Avoid overflow, divide by 2, trunctate decimals
    const result = guess(mid); //* Only calculate the value once

    if (result === 0) {
      return mid;
    } else if (result === -1) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

//* Time: O(log n) - We eliminate half of the search space every iteration of the loop

//* Space: O(1) - We don't use any space that scales with the input size
